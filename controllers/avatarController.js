const Avatar = require('../models/Avatar');

exports.create = function(request, response) {
  const { body } = request;
  //code for checking params and authenticity

  Avatar.create(body)
    .then(id => response.status(201).json({ message: `Successfully created new avatar with id${id}`}))
    .catch(error => response.status(500).json({ error }))
}

exports.update = function(request, response) {
  const { body } = request;

  Avatar.update(body)
    .then(() => response.status(204).json({ message: 'Successfully updated' }))
    .catch(error => response.status(500).json({ error }))
}

exports.delete = function(request, response) {
  const { body } = request;

  Avatar.delete(body)
    .then(() => response.status(204).json({ message: 'successfully deleted'}))
    .catch(error => response.status(500).json({ error}));
}