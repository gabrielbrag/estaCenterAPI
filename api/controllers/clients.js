module.exports = app => {
    const Clients =  app.models.clients 
    const controller = {};
    
    controller.create = (req, res) => {
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      const client = new Clients({
        id             : req.body.id,
        name           : req.body.name,
        document       : req.body.document,
        birthDate      : req.body.birthDate,
        email          : req.body.email,
        cep            : req.body.cep,
        phone          : req.body.phone,
        isActive       : req.body.isActive,
        partnership_id : req.body.partnership_id
      });
    
      Clients.create(client, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else res.send(data);
      });
    };

    controller.find = (req, res) => {
      const client = new Clients({
        id             : req.query.id,
        name           : req.query.name,
        document       : req.query.document,
        birthDate      : req.query.birthDate,
        email          : req.query.email,
        cep            : req.query.cep,
        phone          : req.query.phone,
        isActive       : req.query.isActive,
        partnership_id : req.query.partnership_id
      });        

        Clients.find(client, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Client with id ${req.params.clientId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Client with id " + req.params.clientId
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
    
      Clients.updateById(
        req.params.clientId,
        new Clients(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Client with id ${req.params.clientId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Client with id " + req.params.clientId
              });
            }
          } else res.send(data);
        }
      );
    };

    controller.delete = (req, res) => {
      Clients.remove(req.params.clientId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found client with id ${req.params.clientId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete client with id " + req.params.clientId
            });
          }
        } else res.send({ message: `Client was deleted successfully!` });
      });
    };

    return controller;
  }