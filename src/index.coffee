pkg     = require '../package'
_       = require 'lodash'
rp      = require 'request-promise'
Promise = require 'bluebird'
crypto  = require 'crypto'
url     = require 'url'

class Kickbox
  constructor: ->
    @baseUrl = "https://api.kickbox.io"

  request: (options) ->
    opts =
      url: url.resolve @baseUrl, options.url
      json: true
      headers:
        'User-Agent': "kickbox-node/#{pkg.version} (https://github.com/kickboxio/kickbox-node)"
      simple: false
      strictSSL: true
      resolveWithFullResponse: true

    opts = _.defaults opts, options

    opts.qs ?= {}
    opts.qs.api_key = @api_key

    rp opts

class Verification extends Kickbox
  ###
    constructor
      {@param} api_key {string} API key
      {@param} version {string} API version
  ###
  constructor: (@api_key, @version = "v2") ->
    throw new Error "Invalid API key" if _.isEmpty @api_key
    super

  ###
    verify
      {@param} email   {string} Email address to be verified
      {@param} timeout {integer} Maximum time, in milliseconds, for the API to complete a verification request. Default: 6000
  ###
  verify: (email, timeout = 6000) ->
    new Promise (resolve, reject) =>
      return reject new Error "Invalid email address" if _.isEmpty email

      req_opts =
        url: "/#{@version}/verify"
        qs:
          email: email
          timeout: timeout

      @request req_opts
        .then (response) ->
          body = response.body

          return resolve response if body.success
          return reject response
        .catch reject

class Authentication extends Kickbox
  ###
    constructor
      {@param} api_key  {string} API key for the Authentication App
      {@param} app_code {string} Authentication App Code
  ###
  constructor: (@api_key, @app_code) ->
    throw new Error "Invalid API key"  if _.isEmpty @api_key
    throw new Error "Invalid App code" if _.isEmpty @app_code
    super

  ###
    authenticate - Sends the authentication email
      {@param} fingerprint {string} The fingerprint retrieved from Kickbox.fingerprint for the email address you wish to send the authentication email to
  ###
  authenticate: (fingerprint) ->
    new Promise (resolve, reject) =>
      return reject new Error "Invalid fingerprint" if _.isEmpty fingerprint

      req_opts =
        url: "/v2/authenticate/#{@app_code}"
        method: 'post'
        qs:
          fingerprint: fingerprint

      @request req_opts
        .then (response) ->
          body = response.body

          return resolve response if body.success
          return reject response
        .catch reject

  ###
    getStatus - Get the status of an authentication
      {@param} id {string} Authentication id returned from the authenticate request
  ###
  getStatus: (id) ->
    new Promise (resolve, reject) =>
      return reject new Error "Invalid authentication id" if _.isEmpty id

      req_opts =
        url: "/v2/authenticate/#{@app_code}/#{id}"

      @request req_opts
        .then (response) ->
          body = response.body

          return resolve response if body.success
          return reject response
        .catch reject

module.exports.Verification   = Verification
module.exports.Authentication = Authentication
