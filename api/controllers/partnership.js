module.exports = app => {
    const Partnership =  app.models.partnership
    const controller = {};
    
    controller.create = (req, res) => {
      // Validate request
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create partner
      const partnership = new Partnership({
        id             : req.body.id,
        cnpj           : req.body.cnpj,
        companyName    : req.body.companyName,
        phone          : req.body.phone,
        cep            : req.body.cep,
        email          : req.body.email,
        discount       : req.body.discount
      });
    
      // Save Spot in the database
      Partnership.create(partnership, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else res.send(data);
      });
    };

    controller.find = (req, res) => {
      // Create partner
      const partnership = new Partnership({
        id             : req.query.id,
        cnpj           : req.query.cnpj,
        companyName    : req.query.companyName,
        phone          : req.query.phone,
        cep            : req.query.cep,
        email          : req.query.email,
        discount       : req.query.discount
      });

      Partnership.find(partnership, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `partnership not found`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving partnership"
            });
          }
        } else res.send(data);
      });
    };
 
    controller.update = (req, res) => {
      // Validate Request
      if (!req.body) {
        res.status(400).send({
          message: "Content cannot be empty!"
        });
      }
    
      Partnership.updateById(
        req.params.partnershipId,
        new Partnership(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found partnership with id ${req.params.partnershipId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating partnership with id " + req.params.partnershipId
              });
            }
          } else res.send(data);
        }
      );
    };

    controller.delete = (req, res) => {
      Partnership.remove(req.params.partnershipId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found partnership with id ${req.params.partnershipId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete partnership with id " + req.params.partnershipId
            });
          }
        } else res.send({ message: `Partnership was deleted successfully!` });
      });
    };

    return controller;
  }