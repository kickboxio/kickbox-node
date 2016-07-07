<p align="center">
  <img src="https://static.kickbox.io/kickbox_github.png" alt="Kickbox Email Verification Service">
  <br>
</p>

# Email Verification Library for Node.js

Kickbox determines if an email address is not only valid, but associated with a actual user. Uses include:

* Preventing users from creating accounts on your applications using fake, misspelled, or throw-away email addresses.
* Reducing bounces by removing old, invalid, and low quality email addresses from your mailing lists.
* Saving money and projecting your reputation by only sending to real email users.

## Getting Started

To begin, hop over to [kickbox.io](http://kickbox.io) and create a free account. Once you've signed up and logged in, click on **API Settings** and then click **Add API Key**. Take note of the generated API Key - you'll need it to setup the client as explained below.

## Installation

Make sure you have [npm](https://npmjs.org) installed.

```bash
$ npm install kickbox
```

#### Versions

Works with [ 0.8 / 0.9 / 0.10 / 0.11 ]


## Verification

### Usage

```js
var kickbox = require('kickbox');
var verification = new kickbox.Verification('Your_API_Key_Here');
verification.verify("test@example.com").then(function(response){
  // Let's see some results
  console.log(response.body);
  
  // Check the headers
  console.log(response.headers);
  
}).catch(function(err){
  console.log(err);
});
```

#### Options

**timeout** `integer` (optional) - Maximum time, in milliseconds, for the API to complete a verification request. Default: 6000.

```js
// Example with options
var kickbox = require('kickbox');
var verification = new kickbox.Verification('Your_API_Key_Here');
verification.verify("test@example.com", 6000).then(/*...*/).catch(/*...*/);
```

### Response information

A successful API call responds with the following values:

* **result** `string` - The verification result: `deliverable`, `undeliverable`, `risky`, `unknown`
* **reason** `string` - The reason for the result. Possible reasons are:
    * `invalid_email` - Specified email is not a valid email address syntax
    * `invalid_domain` - Domain for email does not exist
    * `rejected_email` - Email address was rejected by the SMTP server, email address does not exist
    * `accepted_email` - Email address was accepted by the SMTP server
    * `low_quality ` - Email address has quality issues that may make it a risky or low-value address
    * `low_deliverability ` - Email address appears to be deliverable, but deliverability cannot be guaranteed
    * `no_connect` - Could not connect to SMTP server
    * `timeout` - SMTP session timed out
    * `invalid_smtp` - SMTP server returned an unexpected/invalid response
    * `unavailable_smtp` - SMTP server was unavailable to process our request
    * `unexpected_error` - An unexpected error has occurred
* **role** `true | false` - *true* if the email address is a role address (`postmaster@example.com`, `support@example.com`, etc)
* **free** `true | false` - *true* if the email address uses a free email service like gmail.com or yahoo.com.
* **disposable** `true | false` - *true* if the email address uses a *disposable* domain like trashmail.com or mailinator.com.
* **accept_all** `true | false` - *true* if the email was accepted, but the domain appears to accept all emails addressed to that domain.
* **did_you_mean** `null | string` - Returns a suggested email if a possible spelling error was detected. (`bill.lumbergh@gamil.com` -> `bill.lumbergh@gmail.com`)
* **sendex** `float` - A quality score of the provided email address ranging between 0 (no quality) and 1 (perfect quality). More information on the Sendex Score can be found [here](http://docs.kickbox.io/v2.0/docs/the-sendex).
* **email** `string` - Returns a normalized version of the provided email address. (`BoB@example.com` -> `bob@example.com`)
* **user** `string` - The user (a.k.a local part) of the provided email address. (`bob@example.com` -> `bob`)
* **domain** `string` - The domain of the provided email address. (`bob@example.com` -> `example.com`)
* **success** `true | false` - *true* if the API request was successful (i.e., no authentication or unexpected errors occurred)

### Response headers

Along with each response, the following HTTP headers are included:

* `X-Kickbox-Balance` - Your remaining verification credit balance (Daily + On Demand).
* `X-Kickbox-Response-Time` - The elapsed time (in milliseconds) it took Kickbox to process the request.

## Authentication

Sends the authentication email.

### Usage
```js

var kickbox = require('kickbox');
var authentication = new kickbox.Authentication("app_api_key", "app_code");
```

## Authenticate
 
### Usage
```js
authentication.authenticate("fingerprint").then(function(response){
  //Get the response
  console.log(response.body);
  
}).catch(function(err){
  console.log(err);
});
```
### Response information

A successful API call responds to the foloowing values:

* **status** `string` - The current status of the authentication. See Events for a list of statuses.
* **track_token** `string` - A token which can be passed to Kickbox.track to render the client-side tracker.
* **id** `string` - The id of this authentication request. Used to check the status of the authentication.
* **success** `true | false` - Whether or not the request completed successfully.
* **message** `string | null` - Provides a textual explanation of any errors (undeliverable email address, etc).

*As a security best practice, the value of `id` should not be exposed to the user.*

### Status

Reports the status of an authentication email.

#### Usage
```js

// Get Authentication Status
authenticate.getStatus("id").then(function(response){
 //Get the response
 console.log(response.body);
}).catch(function(err){
 console.log(err);
});

```

### Response information

A successful API call responds to the following values

* **occurred_at** `string` - UTC timestamp of current status.
* **last_sent** `string` - UTC timestamp when the most recent authentication email was sent.
* **status** `string` - The current status of the authentication. See Events for a list of statuses.
* **geo_city** `string`` | null` - City of the authenticated user (based on IP address).
* **geo_region** `string | null` - Region (state) of the authenticated user (based on IP address).
* **geo_country** `string | null` - Country of the authenticated user (based on IP address).
* **ip_address** `string | null` - IP address of the authenticated user.
* **reason** `string` | null - Reason why the authentication email was not sent.
  * `disposable` - The domain the user provided is for a disposable email service.
  * `invalid_domain` - The domain the user provided does not exist.
  * `rejected_email` - The mail server of the recipient rejected the message. Usually because the email address does not exist.
* **id** `string` - Unique identifier of the authentication.
* **email** `string` - Email address of user.
* **name** `string | null` - Placeholder for future feature. Not used at this time.
* **success** `true | false` - Whether or not the request completed successfully.
* **message** `string | null` - Provides a textual explanation of any errors (undeliverable email address, etc).

## License
MIT

## Bug Reports
Report [here](https://github.com/kickboxio/kickbox-node/issues).

## Need Help?
help@kickbox.io
