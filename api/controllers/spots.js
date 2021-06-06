module.exports = app => {
    const Spots =  app.models.spots //require("../models/spots.js");
    const controller = {};
    
    controller.create = (req, res) => {
      // Validate request
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create spot
      const spot = new Spots({
        isCovered: req.body.isCovered,
        floors_id: req.body.floors_id,
      });
    
      // Save Spot in the database
      Spots.create(spot, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else res.send(data);
      });
    };

    controller.find = (req, res) => {
      const spot = new Spots({
        id : req.query.id,
        isCovered: req.query.isCovered,
        floors_id: req.query.floors_id,
      });

      Spots.find(spot, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Spot with id ${req.params.spotId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Spot with id " + req.params.spotId
            });
          }
        } else res.send(data);
      });
    };

    controller.listSpots = (req, res) => {
      Spots.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving spots."
          });
        else res.send(data);
      });
    };
 
    controller.update = (req, res) => {
      // Validate Request
      if (!req.body) {
        res.status(400).send({
          message: "Content cannot be empty!"
        });
      }
    
      Spots.updateById(
        req.params.spotId,
        new Spots(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Spot with id ${req.params.spotId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Spot with id " + req.params.spotId
              });
            }
          } else res.send(data);
        }
      );
    };

    controller.delete = (req, res) => {
      Spots.remove(req.params.spotId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found spot with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete spot with id " + req.params.customerId
            });
          }
        } else res.send({ message: `Spot was deleted successfully!` });
      });
    };

    return controller;
  }