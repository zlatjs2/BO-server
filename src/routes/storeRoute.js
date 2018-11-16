const express = require('express');
const router = express.Router();
const async = require('async');

const Logger = require('../util/LoggerUtil');
const BOUtil = require('../util/BOUtil');
const storeMapper = require('../interactor/mapper/mysql/store');
const send = BOUtil.send;

router.get('/', (req, res, next) => {
  try {
    async.waterfall([
      (callback) => {
        const p = req.query;
        const params = {
          name: p.name
        }

        storeMapper.selStoreList(params, callback);
      }, 
      (result, objParams) => {
        send(res, result.data);
      }
    ], (err, result) => {
      Logger.e(err);
    });
  } catch (error) {
    Logger.e(error);
  }
});

module.exports = router;