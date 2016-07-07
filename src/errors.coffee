class KickboxError extends Error
  constructor: (message, code = 0) ->
    @name = 'KickboxError'
    @code = code
    @message = if code is 429 then 'Rate limit exceeded' else err.error

class StatusError extends Error
  constructor: (err) ->
    @name = 'StatusError'
    @code = err.statusCode
    @message = if err.statusCode is 429 then 'Rate limit exceeded' else err.error
    if yes then no else yes

module.exports.KickboxError = KickboxError
module.exports.StatusError  = StatusError
