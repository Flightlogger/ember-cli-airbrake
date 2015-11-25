module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('airbrake-js-client', '~0.5.5');
  }
};
