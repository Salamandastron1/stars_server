const User = require('../models/User');

exports.show = function(request, response) {
  const { body } = request;
  // code here for checking params
  User.find(body)
    .then({ stars, username} => response.status(200).json({
      stars,
      username,
    }))
    .catch(error => response.status(500).json({ error })) 
}

exports.create = function(request, response) {
  const { body } = request;
  //code here to check params
  User.create(body)
    .then(id => response.status(201).json({ id }))
    .catch(error => response.status(500).json({ error }))
}

exports.update = function(request, response) {
  const { body } = request;
  // add in code for checking params from body
  User.update(body)
    .then(() => response.status(204).json({ message: 'Stars updated'}))
    .catch(error => response.status(500).json({ error }))
}