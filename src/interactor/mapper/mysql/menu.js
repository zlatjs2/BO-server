const mysql = require('../../connector/mysql');
const Logger = require('../../../util/LoggerUtil');
const BOUtil = require('../../../util/BOUtil');
const StringUtil = require('../../../util/StringUtil');
const DateUtil = require('../../../util/DateUtil');

const menuMapper = {};
const TABLE = 'Menu';

menuMapper.selMenuList = (params, callback) => {
  let and = '';

  if (!StringUtil.isEmpty(params.name)) {
    and += `and menuname like '%${params.name}%'`;
  }
  if (!StringUtil.isEmpty(params.status)) {
    and += `and status='${params.status}'`;
  }
  if (!StringUtil.isEmpty(params.type)) {
    and += `and mealtype='${params.type}'`;
  }
  if (!StringUtil.isEmpty(params.storeId)) {
    and += `and sid='${params.storeId}'`;
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

menuMapper.addMenu = (params, callback) => {
  const {
    sid,
    storename,
    menuname,
    categorySeq,
    seq,
    price,
    sellprice,
    supplyprice,
    status,
    mealtype,
    categoryid,
    category,
    intro,
    productid,
    prodtype
  } = params;
  const mid = BOUtil.uuid(sid);
  const regdate = DateUtil.yyyyMmDdHhMmSs(new Date());
  const query = `
    insert into ${TABLE}
    (
      mid, sid, storename,
      menuname, seq, price, 
      sellprice, supplyprice,
      status, mealtype, regdate,
      categorySeq, categoryid, category,
      intro, productid, prodtype
    )
    values
    (
      '${mid}', '${sid}', '${storename}',
      '${menuname}', '${seq}', '${price}',
      '${sellprice}', '${supplyprice}',
      '${status}', '${mealtype}', '${regdate}',
      '${categorySeq}', ${categoryid}', '${category}',
      '${intro}', '${productid}', '${prodtype}'
    )
  `;

  mysql.execute(query, res => {
    Logger.d(`menuMapper.addMenu done - result: ${res.success}`);
    const error = res.msg ? res.msg : null;
    BOUtil.wfExce(error, callback, res);
  });
};

module.exports = menuMapper;
