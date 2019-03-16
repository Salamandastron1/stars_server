const Avatar = require('../models/Avatar');

function retrieve(request, response) {
  const { body } = request;

  return Avatar.retrieve(body)
    .then((url) => {
      response.status(200).json(url);
    })
    .catch(error => response.status(500).json({ error: error.message }));
}

function create(request, response) {
  const { body } = request;

  Avatar.create(body)
    .then(id => response.status(201).json(id))
    .catch(error => response.status(500).json({ error }));
}

function update(request, response) {
  const { body } = request;

  Avatar.update(body)
    .then(data => response.status(202).json(data))
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

  if (request.method !== 'GET') {
    return next();
  }

  if (keys.length > 1 || keys.length <= 0) {
    return response.status(401).json({ message: 'Invalid number of parameters' });
  }
  if (keys[0] !== 'stars' || typeof body.stars !== 'number') {
    return response.status(400).json({ message: 'Your inquiry must be made with the follow parameters: Object key: stars value: [number]' });
  }

  return next();
}

function postParams(request, response, next) {
  const missingParams = [];
  const { body } = request;
  const keys = Object.keys(body);
  const format = 'Required format OBJECT {  avatar_url: [string], threshold: [number] }';
  if (request.method !== 'POST') {
    return next();
  }
  if (keys.length > 2 || keys.length < 2) {
    return response.status(403).json({ message: `You have invalid amount of entries. ${format}` });
  }

  ['threshold', 'avatar_url'].forEach((key) => {
    if (!body[key]) {
      missingParams.push(key);
    }
    if (key === 'threshold' && typeof body[key] !== 'number') {
      missingParams.push(key);
    }
    if (key === 'avatar_url' && typeof body[key] !== 'string') {
      missingParams.push(key);
    }
  });
  if (missingParams.length) {
    return response.status(400).json({
      message: `These elements were missing or their data types incorrect ${missingParams}. ${format}`,
    });
  }

  return next();
}

module.exports = {
  retrieve,
  create,
  update,
  remove,
  cleanParams,
  postParams,
};
