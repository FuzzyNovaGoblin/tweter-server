var mysql = require('mysql');

const sqlcon = mysql.createConnection({
   host: "127.0.0.1",
   user: process.env.SQLUSER ||"twetajnd_fuzzy",
   password: process.env.SQLPASS ||"nVcjBAWs$&XH901c3YVJ",
   database: "twetajnd_twater"
});

sqlcon.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
});

module.exports = sqlcon;