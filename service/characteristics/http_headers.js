'use strict';

// org.bluetooth.characteristic.http_headers

const {Characteristic} = require('bleno');

const httpHeaders = (requestData) => new Characteristic({
  uuid: '2AB7',
  properties: ['read', 'write'],
  onReadRequest: (offset, callback) => {
    callback(Characteristic.RESULT_SUCCESS, new Buffer(requestData.headers));
  },
  onWriteRequest: (data, offset, withoutResponse, callback) => {
    requestData.headers = data.toString('utf8');
    callback(Characteristic.RESULT_SUCCESS);
  }
});

module.exports = httpHeaders;
