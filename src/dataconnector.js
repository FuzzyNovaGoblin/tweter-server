var mysql = require('mysql');

const sqlcon = mysql.createConnection({
   host: "127.0.0.1",
   user: process.env.SQLUSER ||"monty",
   password: process.env.SQLPASS ||"some_pass",
   database: "twater"
});

sqlcon.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
});

module.exports = sqlcon;