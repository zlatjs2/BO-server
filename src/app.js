const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const session = require('express-session');
require('dotenv').config();

const storeRoute = require('./routes/StoreRoute');
const menuRoute = require('./routes/MenuRoute');

const port = 9010;
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

const logError = (err, req, res, next) => {
  console.log('##### logError: ', err.stack);
  next(err);
};
// client error 오류
const clientErrorHandler = (err, req, res, next) => {
  console.log('##### clientErrorHandler: ');
  if (req.xhr) {
    res.status(500).send({ err: 'Something failed!' });
  } else {
    next(err);
  }
};
// 모든 오류를 처리하는 (catch-all) 함수
const errorHandler = (err, req, res, next) => {
  console.log('##### errorHandler: ');
  res.status(500);
  res.render('error', { error: err });
};

// cors 설정
app.use(cors());
app.use(helmet()); // HTTP 헤더를 적절히 설정하여 몇가지 잘 알려진 웹 취양성으로부터 앱을 보호.
app.use(
  session({
    secret: '&*%HOHEE%*&', // 쿠키를 임의로 변조하는것을 방지하기 위한 값. 이 값을 통해서 세션을 암호화 하여 저장한다.
    resave: false, // 세션을 언제나 저장할 지 정하는 값. express-session docs에서는 false로 하는것을 권한하고 필요에 따라 true로 설정
    saveUninitialized: true // 세션이 저정되기 전에 uninitialized(초기화 되지않은)상태로 미리 만들어서 저장
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser()); // 쿠키 구문 분석 미들웨어 함수

app.use('/store', storeRoute);
app.use('/menu', menuRoute);

app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use((err, req, res, next) => {
  console.error('err stack: ', err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log('BO-server start');
});
