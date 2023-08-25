const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nka_blog'
});


connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error.message);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
