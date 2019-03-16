const Avatar = require('../models/Avatar');

function retrieve(request, response) {
  const { body } = request;

  Avatar.retrieve(body)
    .then((url) => {
      response.status(200).json(url);
    })
    .catch(error => response.status(500).json({ error: error.message }));
}

function create(request, response) {
  const { body } = request;

  Avatar.create(body)
    .then(id => response.status(201).json({ message: `Successfully created new avatar with id${id}` }))
    .catch(error => response.status(500).json({ error }));
}

function update(request, response) {
  const { body } = request;

  Avatar.update(body)
    .then(() => response.status(204).json({ message: 'Successfully updated' }))
    .catch(error => response.status(500).json({ error }));
}

function remove(request, response) {
  const { body } = request;

  Avatar.delete(body)
    .then(() => response.status(204).json({ message: 'successfully deleted' }))
    .catch(error => response.status(500).json({ error }));
}

module.exports = {
  retrieve,
  create,
  update,
  remove,
};
