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
            // send(res, result.data);
            const r = {
              code: 200,
              data: result.data
            };
            res.json(r);
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
              sid: p.sid,
              storename: p.storename,
              menuname: p.menuname,
              seq: p.seq,
              price: p.price,
              sellprice: p.sellPrice,
              supplyprice: p.supplyPrice,
              status: p.status,
              mealtype: p.mealType,

              categorySeq: p.categorySeq ? p.categorySeq : 0,
              categoryid: p.categoryId ? p.categoryId : 0,
              category: p.category ? p.category : null,
              intro: p.intro ? p.intro : null,
              productid: p.productId ? p.productId : null,
              prodtype: p.prodType ? p.prodType : null
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
