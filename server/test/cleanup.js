var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'trails',
  port: "8000"
});

connection.connect();
connection.query('DELETE from users WHERE name="try";', function (error, result) {
  console.log("+++ 14 cleanup result: ", result)
    console.log("+++ 15 cleanup error: ", error)
  if (error) {
    throw error;
  }
  console.log('deleted ' + result.affectedRows + ' rows. All clean!');
});
connection.end();



// DELETE from users WHERE name="try"
