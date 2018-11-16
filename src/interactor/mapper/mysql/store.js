const Logger = require('../../../util/LoggerUtil');
const BOUtil = require('../../../util/BOUtil');
const mysql = require('../../connector/mysql');

const storeMapper = {};
const TABLE = 'Store';

storeMapper.selStoreList = (params, callback) => {
  let and = '';
  if(params.name) {
    and += `and name like '%${params.name}%'`
  }

  let query = `
    select * from ${TABLE}
    where 1=1 ${and}
  `;
  mysql.execute(query, (res) => {
    Logger.d(`storeMapper.selStoreList done - result: ${res.success}`);
    BOUtil.wfExce(null, callback, res);
  });

}
module.exports = storeMapper;