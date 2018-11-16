const log4js = require('log4js');
const dateFormat = require('dateformat');

const LOG4JS_FILE_PATH = '/service/log/nodejs/BO_node.log';
const ONE_DAY_ROLLING_PATTERN = '.yyyy-MM-dd'; // 하루단위 롤링.
const ONE_HOUR_ROLLING_PATTERN = '.yyyy-MM-dd-hh';  // 시간단위 롤링.

const TOKEN = 'test-user';

log4js.configure({
  pm2: true,
  appenders: {
    'BO_logfile': {
      type: 'dateFile', filename: LOG4JS_FILE_PATH, pattern: ONE_DAY_ROLLING_PATTERN,
      layout: {
        type: 'messagePassThrough'
      }
    },
    'BO_debug': {
      type: 'console',
      layout: {
        type: 'coloured'
      }
    }
  },
  categories: { 
    default: { appenders: ['BO_logfile'], level: 'debug' } ,
    BO_debug: { appenders: ['BO_debug'], level: 'debug'}
  }
});

const logger_file = log4js.getLogger('BO_logfile');
const logger_debug = log4js.getLogger('BO_debug');
const Logger = {};

Logger.df = (log) => {
  logger_file.debug(log);
  Logger.d(log);
};

Logger.i = (s) => {
  let prefix = `<${process.pid}> `;
  logger_debug.info(prefix + s);
}

Logger.d = (s) => {
  let prefix = `<${process.pid}> `;
  logger_debug.debug(prefix + s);
};

Logger.e = (s) => {
  let prefix = `<${process.pid}> `;
  logger_debug.error(prefix + s);
};

Logger.eJSON = (json, tag) => {
  const s = JSON.stringify(json);
  let prefix = `<${process.pid}> `;
  let _tag = '';
  
  if (tag) {
    _tag = `(${tag}) => `
  }
  logger_debug.error(prefix + _tag + s);
}

module.exports = Logger;
