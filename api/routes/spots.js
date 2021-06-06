'use strict';
module.exports = function(app) {
  var spots = app.controllers.spots;
  
  app.route('/api/v1/spots')
    .get(spots.find)
    .post(spots.create)
  console.log(spots)

  app.route('/api/v1/spots/:spotId')
    .put(spots.update)
    .delete(spots.delete)
};