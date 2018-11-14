const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const storeRoute = require('./routes/StoreRoute');

const port = 9001

const logError = (err, req, res, next) => {
  console.log('##### logError: ', err.stack);
  next(err);
}
// client error 오류
const clientErrorHandler = (err, req, res, next) => {
  console.log('##### clientErrorHandler: ');
  if (req.xhr) {
    res.status(500).send({ err: 'Something failed!' });
  } else {
    next(err);
  }
}
// 모든 오류를 처리하는 (catch-all) 함수
const errorHandler = (err, req, res, next) => {
  console.log('##### errorHandler: ');
  res.status(500);
  res.render('error', { error: err});
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.use('/', storeRoute);

app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(cookieParser());      // 쿠키 구문 분석 미들웨어 함수

app.use((err, req, res, next) => {
  console.error('err stack: ', err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
  console.log('BO-server start');
});