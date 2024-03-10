const mysql = require('mysql');
const sql = require('./db/sql.js');

const dbInfo = {
    connetionLimit : process.env.MYSQL_LIMIT,
    host : process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database : process.env.MYSQL_DATABASE,    
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD
}

// module.exports = {
//   connection(table,alias, param = []) {
//    console.log(table)
//    console.log(alias)
//    return new Promise((resolve, reject) => dbPool.query(sql[table][alias], param, (error, results) => {
//      if (error) {
//        reject({
//          error
//        });
//      } else resolve(results);
//    }));
//  }
// };

const dbPool = mysql.createPool(dbInfo);
module.exports = {
  connection(table, alias, param = [], where="") {
    return new Promise((resolve, reject) => dbPool.query(sql[table][alias] + where, param, (error, results) => {
      if (error) {         
        reject({
          error
        });
      } else { 
      resolve(results);
     console.log(results)
    }
    }));
  },
  getConnecttion(){
    return new Promise((resolve, reject) => dbPool.getConnection( (error, conn) => {
      if (error) { 
        reject({
          error
        });
      } else { 
      resolve(conn);
    }
    })); 
  },

  trConnection(conn, table, alias, param = [], where="") {
    return new Promise((resolve, reject) => conn.query(sql[table][alias] + where, param, (error, results) => {
      if (error) {         
        reject({
          error
        });
      } else { 
      resolve(results);
     console.log(results)
    }
    }));
  },

  excuteConnection(conn,cmd){
    return new Promise((resolve, reject) => conn.query(cmd, (error, results) => {
      if (error) {         
        reject({
          error
        });
      } else { 
      resolve(results);
     console.log(results)
    }
    }));
  },
 
  // 사용자 이메일로 사용자 정보 조회
  findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      dbPool.query(query, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
};