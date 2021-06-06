const mysql = require("mysql");
const config = require("../../config/default.json");

// Create a connection to the database
const connection = mysql.createConnection({
    host     : config.database.host,
    user     : config.database.user,
    password : config.database.password,
    database : config.database.database,
    typeCast: function (field, next) {
      if (field.type === 'BIT') {
        return (field.string() === "\x01"); // 1 = true, 0 = false
      } else {
        return next();
      }}
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
});

module.exports = connection;