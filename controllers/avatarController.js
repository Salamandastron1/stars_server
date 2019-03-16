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

function cleanParams(request, response, next) {
  const { body } = request;
  const keys = Object.keys(body);

  if (keys.length > 1 || keys.length <= 0) {
    return response.status(401).json({ message: 'Invalid number of parameters' });
  }
  if (keys[0] !== 'stars' || typeof body.stars !== 'number') {
    return response.status(400).json({ message: 'Your inquiry must be made with the follow parameters: Object key: stars value: [number]' });
  }
  next();
  return
}

module.exports = {
  retrieve,
  create,
  update,
  remove,
  cleanParams,
};
