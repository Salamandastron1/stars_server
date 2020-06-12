const User = require('../models/User');

function show(request, response) {
  const { body } = request;
  // code here for checking params
  return User.find(body)
    .then((user) => {
      if (user) {
        return response.status(200).json(user);
      }
      return response.status(401).json({ message: 'incorrect password' });
    })
    .catch(error => response.status(500).json({ message: error.message }));
}

function create(request, response) {
  const { body } = request;

  User.create(body)
    .then(user => response.status(201).json(user))
    .catch(error => response.status(500).json({ message: error.message }));
}

function update(request, response) {
  const { body, params } = request;
  User.update(params.id, body.stars)
    .then(() => response.sendStatus(204))
    .catch(error => response.status(500).json({ message: error.message }));
}

function cleanParams(req, res, next) {
  const { body } = req;
  const missingParams = [];

  if (req.method === 'PUT') {
    return next();
  }

  if (Object.keys(body).length > 2) {
    return res.status(403).json({
      message: 'forbidden amount of sent parameters',
    });
  }

  ['email', 'password'].forEach((param) => {
    if (!body[param]) {
      missingParams.push(param);
    }
  });

  if (missingParams.length) {
    return res.status(403).json({ message: `You are missing these parameters in your body: ${missingParams}` });
  }
  return next();
}

module.exports = {
  show,
  create,
  update,
  cleanParams,
};
