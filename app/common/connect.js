var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'localhost',
    user:'newuser',
    password:'',
    database:'demo_node',
    port:'3306'
})

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
})

module.exports = connection