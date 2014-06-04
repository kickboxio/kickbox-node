/**
 * 
 */
var Kickbox = function(client) {
  this.client = client;

  return this;
};

/**
 * Email Verification
 *
 * '/verify?email=:email' GET
 *
 * @param "email" Email address to verify
 */
Kickbox.prototype.verify = function (email, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/verify?email=' + email + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Kickbox
