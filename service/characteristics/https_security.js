'use strict';

// org.bluetooth.characteristic.https_security

const {Characteristic} = require('bleno');

const httpsSecurity = new Characteristic({
  uuid: '2ABB',
  properties: ['read'],
  onReadRequest: (offset, callback) => {
    callback(Characteristic.RESULT_SUCCESS, new Buffer([0]));
  }
});

module.exports = httpsSecurity;
