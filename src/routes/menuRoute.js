const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../interactor/connector/mysql.js');

const Logger = require('../util/LoggerUtil');
const BOUtil = require('../util/BOUtil');
const menuMapper = require('../interactor/mapper/mysql/menu');
const send = BOUtil.send;

router.get('/', (req, res) => {
  try {
    async.waterfall(
      [
        callback => {
          const p = req.query;
          const params = {
            name: p.name !== undefined ? p.name : '',
            status: p.status !== undefined ? p.status : '',
            type: p.type !== undefined ? p.type : '',
            page: p.page !== undefined ? p.page : '0',
            pageRow: p.pageRow !== undefined ? p.pageRow : '20'
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
});

module.exports = router;
