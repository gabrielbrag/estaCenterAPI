const express   = require('express');
const config    = require('./default.json');
const mysql     = require("mysql");
const consign   = require("consign");

module.exports = () => {
    const app = express();
  

    app.set('port', process.env.PORT || config.server.port);

    app.use(express.json());
  
    consign({'cwd':'api'})
        .then('utils')
        .then('data')
        .then('models')
        .then('controllers')
        .then('routes')
        .into(app);

    var connection = mysql.createConnection({
        host     : config.database.host,
        user     : config.database.user,
        password : config.database.password,
        database : config.database.database
      });
      
    app.set('DBconnection', connection)

    return app;
};