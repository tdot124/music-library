const mysql = require('mysql2/promise');
const Connection = require('mysql2/typings/mysql/lib/Connection');

const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, envFile),
  });

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

db.query(`DROP DATABASE ${DB_NAME}`, () => db.end());

