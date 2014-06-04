/**
 * This module takes care of devising the auth type and using it
 */
var Auth = function(auth) {
  this.auth = auth;

  this.HTTP_HEADER = 1;

  return this;
};

/**
 * Calculating the type of authentication
 */
Auth.prototype.getAuthType = function () {

  if (this.auth['http_header']) {
    return this.HTTP_HEADER;
  }

  return -1;
};

/**
 * Set authentication for the request
 *
 * This should throw error because this should be caught while in development
 */
Auth.prototype.set = function (request, callback) {
  if (Object.keys(this.auth).length == 0) {
    return callback(new Error('Server requires authentication to proceed further. Please check'));
  }

  var auth = this.getAuthType(), flag = false;

  if (auth == this.HTTP_HEADER) {
    request = this.httpHeader(request);
    flag = true;
  }

  if (!flag) {
      return callback(new Error('Unable to calculate authorization method. Please check.'));
  }

  callback(null, request);
};

/**
 * Authorization with HTTP header
 */
Auth.prototype.httpHeader = function(request) {
  request['headers']['Authorization'] = 'token ' + this.auth['http_header'];

  return request;
};

// Export module
module.exports = Auth;
