var mysql = require('mysql');

var con = mysql.createConnection({
   host: "127.0.0.1",
   user: "monty",
   password: "some_pass"
});

con.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
});