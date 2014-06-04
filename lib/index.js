var Client = require('./kickbox/client');

// Export module
var kickbox = module.exports;

/**
 * This file contains the global namespace for the module
 */
kickbox.client = function(auth, options) {
  return new Client(auth, options);
};
