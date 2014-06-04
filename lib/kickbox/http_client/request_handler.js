var request = module.exports;

/**
 * This module takes care of encoding the request body into format given by options
 */
request.setBody = function(reqobj, body, options) {
  var type = (options['request_type'] ? options['request_type'] : 'raw');


  // Raw body
  if (type == 'raw') {
    reqobj['body'] = body;

    if (typeof reqobj['body'] == 'object') {
      delete reqobj['body'];
    }
  }

  return reqobj;
};
