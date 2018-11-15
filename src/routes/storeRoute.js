const express = require('express');
const router = express.Router();
const async = require('async');

const Logger = require('../util/LoggerUtil');

router.get('/', (req, res, next) => {
  try {
    async.waterfall([
      (callback) => {
        let responseText = 'Hello World!';
        responseText += ' Requested at: ' + req.requestTime + '';
        res.send(responseText);
      }
    ], (err, result) => {
      Logger.e(error);
    })
  } catch (error) {
    Logger.e(error);
  }
});

module.exports = router;