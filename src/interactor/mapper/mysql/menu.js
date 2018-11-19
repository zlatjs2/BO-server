const Logger = require('../../../util/LoggerUtil');
const BOUtil = require('../../../util/BOUtil');
const mysql = require('../../connector/mysql');

const menuMapper = {};
const TABLE = 'Menu';

menuMapper.selMenuList = (params, callback) => {
  let obj = Object.values(params);
  let and = '';

  if (obj.length === 1) {
    if (params.name) {
      and += `and menuname like '%${params.name}%'`;
    } else if (params.status) {
      and += `and status='${params.status}'`;
    } else if (params.type) {
      and += `and mealtype='${params.type}'`;
    }
  } else if (obj.length === 2) {
    if (params.name || params.status) {
      and += `
        and menuname like '%${params.name}%'
        and status='${params.status}'
      `;
    } else if (params.name || params.type) {
      and += `
        and menuname like '%${params.name}%'
        and mealtype='${params.type}'
      `;
    } else if (params.status || params.type) {
      and += `
        and status='${params.status}'
        and mealtype='${params.type}'
      `;
    }
  } else if (params.name || params.status || params.type) {
    and += `
      and menuname like '%${params.name}%'
      and status='${params.status}'
      and mealtype='${params.type}'
    `;
  }

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
