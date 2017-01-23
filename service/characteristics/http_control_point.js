'use strict';

// org.bluetooth.characteristic.http_control_point

const http = require('http'),
  https = require('https'),
  {parse} = require('url'),
  {Characteristic} = require('bleno'),
  httpStatusCode = require('./http_status_code'),
  debug = require('../../debug')('http_control_point');

const opCodeMapping = [
  undefined,
  {handler: http, protocol: 'http:', method: 'GET'},
  {handler: http, protocol: 'http:', method: 'HEAD'},
  {handler: http, protocol: 'http:', method: 'POST'},
  {handler: http, protocol: 'http:', method: 'PUT'},
  {handler: http, protocol: 'http:', method: 'DELETE'},
  {handler: https, protocol: 'https:', method: 'GET'},
  {handler: https, protocol: 'https:', method: 'HEAD'},
  {handler: https, protocol: 'https:', method: 'POST'},
  {handler: https, protocol: 'https:', method: 'PUT'},
  {handler: https, protocol: 'https:', method: 'DELETE'},
];

const HEADERS_RECEIVED = 1,
  BODY_RECEIVED = 4;

const setStatusCode = (statusCode, httpCode) => {
  debug(`Status code: ${statusCode}`);

  const data = new Buffer(3);
  data.writeUInt16LE(statusCode, 0);
  data.writeUInt8(httpCode, 2);

  if (httpStatusCode.updateValueCallback) {
    httpStatusCode.updateValueCallback(data);
  }
};

const httpControlPoint = (requestData) => new Characteristic({
  uuid: '2ABA',
  properties: ['write'],
  onWriteRequest: (data, offset, withoutResponse, callback) => {
    const {handler, protocol, method} = opCodeMapping[data.readUInt8(0)],
      options = Object.assign(parse(`${protocol}//${requestData.uri}`), {method});

    debug('Request options:', options);

    const request = handler.request(options, (response) => {
      const {headers, statusCode} = response;
      requestData.headers = Object
        .keys(headers)
        .map(header => `${header}: ${headers[header]}\r\n`);

      setStatusCode(statusCode, HEADERS_RECEIVED);
      requestData.headers = '';
      response.on('data', (data) => requestData.body += data.toString());
      response.on('end', () => setStatusCode(statusCode, HEADERS_RECEIVED|BODY_RECEIVED));
    });
    request.on('error', (error) => {
      console.log(error);
      debug(`Request error: ${error.message}`);
    });
    request.end();

    callback(Characteristic.RESULT_SUCCESS);
  }
});

module.exports = httpControlPoint;
