'use strict';

// HTTP Proxy Service
// https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.service.http_proxy.xml

const bleno = require('bleno'),
  debug = require('../debug')('service'),
  characteristics = require('./characteristics');

const name = 'EspruinoHub',
  requestData = {
    uri: '',
    headers: '',
    body: ''
  },
  uuid = '1823',
  service = new bleno.PrimaryService({
    uuid,
    characteristics: characteristics(requestData)
  });

module.exports = () => {
  bleno
    .on('accept', () => debug('Accepted'))
    .on('disconnect', () => debug('Disconnected'))
    .on('stateChange', state => {
      debug('state change');
      if (state === 'poweredOn') {
        debug('powered on');
        bleno.startAdvertising(name, [uuid], error => {
          if (!error) {
            bleno.setServices([service]);
          } else {
            debug('error', error);
          }
        });
      }
    });
};
