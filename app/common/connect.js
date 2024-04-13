const mysql = require('mysql')

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DATABASE,
    port:process.env.DBPORT
})

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
})

module.exports = connection