// org.bluetooth.characteristic.uri

const {Characteristic} = require('bleno'),
  debug = require('../../debug')('uri');

const uri = (requestData) => new Characteristic({
  uuid: '2AB6',
  properties: ['write'],
  onWriteRequest: (data, offset, withoutResponse, callback) => {
    requestData.uri = data.toString('utf8');
    debug(requestData.uri);
    callback(Characteristic.RESULT_SUCCESS);
  }
});

module.exports = uri;
