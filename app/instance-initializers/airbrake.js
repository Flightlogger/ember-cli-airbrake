import Ember from "ember";
import config from "../config/environment";

var isSetup = false;

function setupAirbrake(application) {
  var airbrake = new airbrakeJs.Client({
    projectId: config.airbrake.projectId,
    projectKey: config.airbrake.projectKey
  });

  if (config.airbrake.host) {
    airbrake.setHost(config.airbrake.host);
  }

  airbrake.addFilter(function(notice) {
    notice.context.environment = config.environment;
    return notice;
  });

  if (config.airbrake.filters) {
    var folder = config.airbrake.filterFolder || 'util';
    config.airbrake.filters.forEach(function(filterName) {
      var filter = application.container.lookupFactory(`${folder}:${filterName}`);
      if (filter) {
        airbrake.addFilter(filter(application));
      }
    });
  }

  var originalOnError = Ember.onerror || Ember.K;
  Ember.onerror = function(err) { // any ember error
    originalOnError(err);
    airbrake.notify(err);
  };

  window.onerror = airbrake.onerror;
}

export function initialize(application) {
  if (!config.airbrake || isSetup) {
    return;
  }
  isSetup = true;
  setupAirbrake(application);
}

export default {
  name: 'airbrake',
  initialize: initialize
};
