module.exports = app => {
  
  const sql = require('./db');
  const utils = app.utils.utils;
  
  // constructor
  const model = function(client){ 
    this.id             = client.id;
    this.name           = client.name
    this.document       = client.document;
    this.birthDate      = client.birthDate;
    this.email          = client.email;
    this.cep            = client.cep;
    this.phone          = client.phone;
    this.isActive       = client.isActive;
    this.partnership_id = client.partnership_id;
  }
  
  model.create = (client, result) => {
    sql.query("INSERT INTO clients SET ?", client, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    
      client.id = res.insertId;
      result(null, client);
    });
  };
  
  
  model.find = (client, result) => {
    var query = "SELECT * FROM clients"

    if (client.id){
      query += utils.haveWhere(query);
      query += "id = " + client.id;
    }

    if (client.name){
      query += utils.haveWhere(query);
      query += "name = " + client.name;
    }

    if (client.document){
      query += utils.haveWhere(query);
      query += "document = " + client.document;
    }

    if (client.birthDate){
      query += utils.haveWhere(query);
      query += "birthDate = " + client.birthDate;
    }

    if (client.email){
      query += utils.haveWhere(query);
      query += "email = " + client.email;
    }

    if (client.cep){
      query += utils.haveWhere(query);
      query += "cep = " + client.cep;
    }

    if (client.phone){
      query += utils.haveWhere(query);
      query += "phone = " + client.phone;
    }

    if (client.isActive){
      query += utils.haveWhere(query);
      query += "isActive = " + client.isActive;
    }

    if (client.partnership_id){
      query += utils.haveWhere(query);
      query += "partnership_id = " + client.partnership_id;
    }

    console.log(query);

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("clients: ", res);
      result(null, res);
    });
  };
  
  model.updateById = (id, client, result) => {
    sql.query(
      "UPDATE clients SET name = ?, "
      + "document = ?, "
      + "birthDate = ?, "
      + "email = ?, "
      + "cep = ?, "
      + "phone = ?, "
      + "isActive = ?, "
      + "partnership_id = ? "
      + "WHERE id = ?",
      [client.name, client.document, client.birthDate, client.email, 
        client.cep, client.phone, client.isActive, client.partnership_id,
        id],
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated client: ", { id: id, ...client });
        client.id = id;
        result(null, client);
      }
    );
  };
  
  model.remove = (id, result) => {
    sql.query("DELETE FROM clients WHERE id = ?", id, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    });
  };
  
    return model;
  }
  