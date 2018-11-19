const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../interactor/connector/mysql.js');

router.get('/', (req, res) => {
  try {
    async.waterfall(
      [
        callback => {
          const params = req.query;
          console.log('# params: ', params);
          if (params.menuname) {
            const query = `
              SELECT * FROM Menu
              WHERE menuname='${params.menuname}'
              LIKE '%감자"'
            `;

            pool.getConnection((err, connection) => {
              if (!err) {
                connection.query(query, (error, menus) => {
                  if (error) throw error;
                  else
                    res.send({
                      data: menus,
                      code: 200
                    });
                });
              }
            });
          } else {
            // 전체 메뉴 검색 (20개씩 Limit)
            const query = `
              SELECT * FROM Menu LIMIT ${20}
            `;
            pool.getConnection((err, connection) => {
              if (!err) {
                connection.query(query, (error, menus) => {
                  if (error) throw error;
                  else
                    res.send({
                      data: menus,
                      code: 200
                    });
                });
              }
            });
          }
        }
        // menus => {
        //   res.send({
        //     data: menus,
        //     code: 200
        //   });
        // }
      ],
      (error, results) => {
        console.log('# error: ', error);
      }
    );
  } catch (error) {
    console.log('## Error: ', error);
  }
});

module.exports = router;
