/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-airbrake',

  included: function(app) {
    this._super.included(app);
    //var config = this.project.config(this.app.env);
    app.import(app.bowerDirectory + '/airbrake-js-client/dist/client.js');
  }
};
