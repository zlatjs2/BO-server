const util = require('util');
const Logger = require('./LoggerUtil');

const CustomUtil = {};

CustomUtil.inspect = (obj) => {
  return util.inspect(obj);
}

module.exports = CustomUtil;