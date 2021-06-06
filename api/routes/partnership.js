'use strict';
module.exports = function(app) {
  var partnership = app.controllers.partnership;
  
  app.route('/api/v1/partnership')
    .get(partnership.find)
    .post(partnership.create)

  app.route('/api/v1/partnership/:partnershipId')
    .put(partnership.update)
    .delete(partnership.delete)
};