module.exports = app => {
  
    const sql = require('./db');
    const utils = app.utils.utils;

    // constructor
    const model = function(partnership){ 
        this.id             = partnership.id
        this.cnpj           = partnership.cnpj
        this.companyName    = partnership.companyName
        this.phone          = partnership.phone
        this.cep            = partnership.cep
        this.email          = partnership.email
        this.discount       = partnership.discount
    }
    
    model.create = (partnership, result) => {
      sql.query("INSERT INTO partnership SET ?", partnership, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        partnership.id = res.insertId;
        result(null, partnership);
      });
    };
    
    
    model.find = (partnership, result) => {
      var query = "SELECT * FROM partnership"
  
      if (partnership.id){
        query += utils.haveWhere(query);
        query += "id = " + partnership.id;
      }
  
      if (partnership.cnpj){
        query += utils.haveWhere(query);
        query += "cnpj = " + partnership.cnpj;
      }

      if (partnership.companyName){
        query += utils.haveWhere(query);
        query += "companyName = " + partnership.companyName;
      }

      if (partnership.phone){
        query += utils.haveWhere(query);
        query += "phone = " + partnership.phone;
      }

      if (partnership.cep){
        query += utils.haveWhere(query);
        query += "cep = " + partnership.cep;
      }
      
      if (partnership.email){
        query += utils.haveWhere(query);
        query += "email = " + artnership.email;
      }

      if (partnership.discount){
        query += utils.haveWhere(query);
        query += "discount = " + partnership.discount;
      }
  
      sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        console.log("partnerships: ", res);
        result(null, res);
      });
    };
    
    model.updateById = (id, partnership, result) => {
      sql.query(
        "UPDATE partnership SET cnpj = ?, "
        + "companyName = ?, "
        + "phone = ?, "
        + "cep = ?, "
        + "email = ?, "
        + "discount = ? "
        + "WHERE id = ?",
        [partnership.cnpj, partnership.companyName, partnership.phone, partnership.cep, 
            partnership.email, partnership.discount, id],
        (err, res) => {
          if (err) {
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated partnership: ", { id: id, ...partnership });
          result(null, { id: id, ...partnership });
        }
      );
    };
    
    model.remove = (id, result) => {
      sql.query("DELETE FROM partnership WHERE id = ?", id, (err, res) => {
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
    