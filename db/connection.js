const mysql = require('mysql2');

// create the connection to database, using port number 3306 in MAMP
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'beer_me_db'
});

module.exports = db;