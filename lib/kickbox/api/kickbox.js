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
 * '/verify?email=:email&timeout=:timeout' GET
 *
 * @param "email" Email address to verify
 */
Kickbox.prototype.verify = function (email, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var timeout = (options['timeout'] ? options['timeout'] : 6000);

  email = encodeURIComponent(email);

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/verify?email=' + email + '&timeout=' + timeout + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Kickbox
