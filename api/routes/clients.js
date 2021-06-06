'use strict';
module.exports = function(app) {
  var clients = app.controllers.clients;
  
  app.route('/api/v1/clients')
    .get(clients.find)
    .post(clients.create)

  app.route('/api/v1/clients/:clientId')
    .put(clients.update)
    .delete(clients.delete)
};