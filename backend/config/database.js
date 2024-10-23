const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'task_manager',
});

module.exports = pool;
