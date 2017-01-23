'use strict';

const httpControlPoint = require('./http_control_point'),
  httpEntityBody = require('./http_entity_body'),
  httpHeaders = require('./http_headers'),
  httpStatusCode = require('./http_status_code'),
  httpsSecurity = require('./https_security'),
  uri = require('./uri');

module.exports = (requestData) => [
  uri(requestData),
  httpHeaders(requestData),
  httpEntityBody(requestData),
  httpControlPoint(requestData),
  httpStatusCode,
  httpsSecurity,
];
