/**
 * Main client for the module
 */
var Client = function(auth, options) {
  this.httpClient = new (require('./http_client').HttpClient)(auth, options);

  return this;
};

/**
 * 
 */
Client.prototype.kickbox = function () {
    return new (require('./api/kickbox'))(this.httpClient);
};

// Export module
module.exports = Client;
