const express = require('express');
const router = express.Router();
const async = require('async');
const Logger = require('../util/LoggerUtil');
const BOUtil = require('../util/BOUtil');
const StringUtil = require('../util/StringUtil');

const menuMapper = require('../interactor/mapper/mysql/menu');
const send = BOUtil.send;

router
  .get('/', (req, res) => {
    try {
      async.waterfall(
        [
          callback => {
            const p = req.query;
            const params = {
              name: p.name,
              status: p.status,
              type: p.type,
              storeId: p.storeId,
              page: StringUtil.isEmpty(p.page) ? '0' : p.page,
              pageRow: StringUtil.isEmpty(p.pageRow) ? '20' : p.pageRow
            };

            menuMapper.selMenuList(params, callback);
          },
          (result, objParams) => {
            send(res, result.data);
          }
        ],
        err => Logger.e(err)
      );
    } catch (error) {
      Logger.e(error);
    }
  })
  .post('/', (req, res) => {
    try {
      async.waterfall(
        [
          callback => {
            const p = req.query;
            const params = {
              sid: '000A870A-1FD1-6FB1-5489-917321E24460',
              // sid: p.sid,
              storename: 'Z_써브웨이(논현역점)',
              menuname: '테스트메뉴빠아아아아아앙',
              categorySeq: 1,
              seq: 50,
              price: 99999,
              sellprice: 9999,
              supplyprice: 999,
              status: 1,
              mealtype: 3,

              categoryid: p.categoryId ? p.categoryId : 0,
              category: p.category, // null
              intro: p.intro, // null
              productid: p.productId, // null
              prodtype: p.prodType // null
            };

            menuMapper.addMenu(params, callback);
          },
          (result, objParams) => {
            console.log('## result: ', result.data);
            // send(res, result.data);
          }
        ],
        err => {
          Logger.e('menu api error: ' + err);
        }
      );
    } catch (error) {
      Logger.e(error);
    }
  });

module.exports = router;
