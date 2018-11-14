const express = require('express');
const router = express.Router();
const async = require('async');

router.get('/', (req, res, next) => {
  try {
    async.waterfall([
      (callback) => {
        let responseText = 'Hello World!';
        responseText += ' Requested at: ' + req.requestTime + '';
        res.send(responseText);
      }
    ], (err, result) => {
      console.log('##### waterfall error: ', error)
    })
  } catch (error) {
    console.log('#####  error: ', error)
  }
})

router.get('/a_route_behind_paywall', (req, res, next) => {
  try {
    async.waterfall([
      (callback) => {
        if (!req.user.ttt) {
          console.log('##### 2: ', 2);
          next('route');    // 라우터 미들웨어 스택의 나머지 미들웨어 함수들을 건너뛴다.
        }
      }
    ], (err, result) => {
      console.log('##### waterfall error: ', error)
    })
  } catch (error) {
    // 오류를 처리하도록 설정된 핸들러를 제외한 체인 내의 나머지 모든 핸들러를 건너 뛴다.
    next(error);
  }
}, (req, res, next) => {
  PaidContent.find((err, doc) => {
    console.log('##### 3: ', 3);
    if (err) return next(err);
    res.json(doc);
  });
});

module.exports = router;