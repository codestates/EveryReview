const mysql = require('mysql2');
const dotenv = require('dotenv');
const config = require('../config/config');
dotenv.config();

const con = mysql.createConnection(
  config['development']
);

con.connect((err) => {
  if (err) throw err;
});

module.exports = con;
