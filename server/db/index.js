const mysql = require('mysql2');
const dotenv = require('dotenv');
// const config = require('../config/config');
dotenv.config();

// const con = mysql.createConnection(
//   config['development']
// );

// con.connect((err) => {
//   if (err) throw err;
// });

const con = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  connectTimeout: 10000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

con.getConnection((err) => {
  if(err) throw err;
});

module.exports = con;
