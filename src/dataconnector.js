var mysql = require('mysql');

const sqlcon = mysql.createConnection({
   host: "127.0.0.1",
   user: "monty",
   password: "some_pass",
   database: "twater"
});

sqlcon.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
});

module.exports = sqlcon;