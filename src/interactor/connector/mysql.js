const mysql = require('mysql');
const BOUtil = require('../../util/BOUtil');
const CustomUtil = require('../../util/CustomUtil');
const Logger = require('../../util/LoggerUtil');

const mysqlConnector = {};

mysqlConnector.createConnection = () => {
  const conn = mysql.createConnection({
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    user: process.env.TEST_DB_NAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_SCHEMA,
    connectionLimit: 400,
    waitForConnections: true
  });
  return conn;

}

mysqlConnector.execute = (query, callback) => {
  const conn = mysqlConnector.createConnection();
  conn.connect((err) => {
    if (err) {
      Logger.e(`mysql.execute - query: ${query} - err: ${CustomUtil.inspect(err)}`);

      const p = {};
      p.success = false;
      p.msg = err.toString();
      BOUtil.safeExec(callback, p);

      if (conn) { conn.end(); }

      return;
    }

    conn.query(query, (err, result) => {
      
      const p = {};
      if (err) {
        Logger.eJSON(err, `query err - query: ${query}`);
        p.success = false;
        p.msg = err.toString();
        BOUtil.safeExec(callback, p);

        if (conn) { conn.end(); }

        return;
      }

      p.success = true;
      p.data = result;
      BOUtil.safeExec(callback, p);

      if (conn) { conn.end() };

    });
  });
};

module.exports = mysqlConnector;
