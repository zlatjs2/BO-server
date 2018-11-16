const Logger = require('./LoggerUtil');

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

module.exports = BOUtil;