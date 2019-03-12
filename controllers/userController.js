/*eslint-disable*/
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
    .catch(error => response.status(500).json({ error }));
}

function create(request, response) {
  const { body } = request;
  //  code here to check params
  User.create(body)
    .then(user => response.status(201).json(user))
    .catch(error => response.status(500).json({ message: error.message }));
}

function update(request, response) {
  const { body } = request;
  // add in code for checking params from body
  User.update(body)
    .then(() => response.status(204).json({ message: 'Stars updated' }))
    .catch(error => response.status(500).json({ error }));
}

function cleanParams(req, res, next) {
  const { body } = req;

  if(req.method === 'PUT') {
    next();
  }
  if (Object.keys(body).length > 2) {
    return res.status(403).json({
      message: 'forbidden amount of sent parameters',
    });
  }
  const missingParams = [];
  ['email', 'password'].forEach((param) => {
    if (!body[param]) {
      missingParams.push(param);
    }
  });
  if (missingParams.length) {
    return res.status(403).json({ message: `You are missing these parameters in your body: ${missingParams}` });
  }
  next();
}

module.exports = {
  show,
  create,
  update,
  cleanParams,
};
