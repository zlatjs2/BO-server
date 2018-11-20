const Logger = require('./LoggerUtil');
const md5 = require('md5');
const secureRandom = require('secure-random');
const uuidv5 = require('uuid/v5');

const BOUtil = {};
const ENV = process.env.ENV;

BOUtil.safeExec = (func, param, objParam) => {
  if (typeof func === 'function') {
    func(param, objParam);
  }
};

BOUtil.wfExce = (err, func, result, objParam) => {
  if (typeof func === 'function') {
    func(err, result, objParam);
  }
};

BOUtil.send = (res, data) => {
  if (ENV === 'development') {
    const jsonStr = JSON.stringify(data);
    const l = `<res>: ${jsonStr}`;
    Logger.d(l);
  }
  res.send({
    code: 200,
    store: data
  })
}

BOUtil.uuid = (id) => {
  const item = new Date().getMilliseconds();
  const sr = secureRandom.randomBuffer(10);
  const message = `${id}:${item}:${sr}`;
  return uuidv5(md5(message), uuidv5.DNS).toUpperCase();
}

module.exports = BOUtil;