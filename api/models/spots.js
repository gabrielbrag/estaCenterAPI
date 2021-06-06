const { format } = require('./db');

module.exports = app => {
  const sql = require('./db');
  const utils = app.utils.utils;

  // constructor
  const model = function(spots){
    this.id         = spots.id;
    this.isCovered  = spots.isCovered;
    this.floors_id  = spots.floors_id;
  }

  model.create = (spot, result) => {
    sql.query("INSERT INTO spots SET ?", spot, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      spot.id = res.insertId
      result(null, spot);
    });
  };

  model.find = (spots, result) => {
    var query = "SELECT id, isCovered, floors_id FROM spots"
    console.log(spots);
    if (spots.id){
      query += utils.haveWhere(query);
      query += "id = " + spots.id;
    }

    if (spots.isCovered){
      query += utils.haveWhere(query);
      query += "isCovered = " + spots.isCovered;
    }

    if (spots.floors_id){
      query += utils.haveWhere(query);
      query += "floors_id = " + spots.floors_id;
    }

    console.log(query);

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("spots: ", res);
      result(null, res);
    });
  };

  model.updateById = (id, spot, result) => {
    sql.query(
      "UPDATE spots SET isCovered = ?, floors_id = ? WHERE id = ?",
      [spot.isCovered, spot.floors_id, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated spots: ", { id: id, ...spot });
        result(null, { id: id, ...spot });
      }
    );
  };

  model.remove = (id, result) => {
    sql.query("DELETE FROM spots WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted spot with id: ", id);
      result(null, res);
    });
  };

  return model;
}
