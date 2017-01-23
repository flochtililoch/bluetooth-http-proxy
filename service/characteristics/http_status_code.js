'use strict';

// https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.characteristic.http_status_code.xml

const {Characteristic} = require('bleno');

const httpStatusCode = new Characteristic({
  uuid: '2AB8',
  properties: ['notify'],
});

module.exports = httpStatusCode;
