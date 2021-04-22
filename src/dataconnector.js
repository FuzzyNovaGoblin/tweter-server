var mysql = require('mysql');

const sqlcon = mysql.createConnection({
   host: "127.0.0.1",
   user: "root",
   password: "some_pass",
   database: "twater"
});

sqlcon.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
   // sqlcon.query("SELECT * FROM post;", function (err, result) {
   //    if (err) throw err;
   //    console.log("Result: " + result[0][0]);
   // });
});

module.exports = sqlcon;