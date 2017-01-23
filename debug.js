const debug = require('debug'),
  {name} = require('./package');

module.exports = (file) => debug(`${name}#${file}`);
