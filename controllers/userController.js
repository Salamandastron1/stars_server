const User = require('../models/User');

exports.show = function(request, response) {
  const { body } = request;
  // code here for checking params
  User.find()
    .then({ stars, username} => response.status(200).json({
      stars,
      username,
    }))
    .catch(error => response.status(500).json({ error })) 
}

exports.create = function(request, response) {
  const { body } = request;
  //code here to check params
  User.create()
    .then(id => response.status(204).json({ id }))
    .catch(error => response.status(500).json({ error }))
}