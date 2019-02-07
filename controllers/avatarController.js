const Avatar = require('../models/Avatar');

exports.create = function(request, response) {
  const { body } = request;
  //code for checking params and authenticity

  Avatar.create(body)
    .then(id => response.status(201).json({ message: `Successfully created new avatar with id${id}`}))
    .catch(error => response.status(500).json({ error }))
}