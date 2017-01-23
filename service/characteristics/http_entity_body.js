'use strict';

// org.bluetooth.characteristic.http_entity_body

const {Characteristic} = require('bleno');

const httpEntityBody = (requestData) => new Characteristic({
  uuid: '2AB9',
  properties: ['read', 'write'],
  onReadRequest: (offset, callback) => {
    callback(Characteristic.RESULT_SUCCESS, new Buffer(requestData.body));
  },
  onWriteRequest: (data, offset, withoutResponse, callback) => {
    requestData.body = data.toString('utf8');
    callback(Characteristic.RESULT_SUCCESS);
  }
});

module.exports = httpEntityBody;
