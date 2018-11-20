const Logger = require('../../../util/LoggerUtil');
const BOUtil = require('../../../util/BOUtil');
const mysql = require('../../connector/mysql');

const menuMapper = {};
const TABLE = 'Menu';

menuMapper.selMenuList = (params, callback) => {
  let and = '';
  
  if (params.name) { and += `and menuname like '%${params.name}%'`; }
  if (params.status) { and += `and status='${params.status}'`; }
  if (params.type) { and += `and mealtype='${params.type}'`; }

  const query = `
    select * from ${TABLE}
    where 1=1 ${and}
    order by price asc
    limit ${params.page}, ${params.pageRow}
  `;

  mysql.execute(query, res => {
    Logger.d(`menuMapper.selMenuList done - result: ${res.success}`);
    BOUtil.wfExce(null, callback, res);
  });
};

module.exports = menuMapper;
