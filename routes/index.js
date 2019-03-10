const userController = require('../controllers/userController');
const avatarController = require('../controllers/avatarController');

function routes(app) {
  app.get('/', (request, response) => {
    response.send({
      'GET user': '/api/v1/users/:id',
      'POST users': '/api/v1/users',
      'PUT users': '/api/v1/users/:id',
      'POST avatar': '/api/v1/avatar',
      'PUT avatar': '/api/v1/avatar',
      'DELETE avatar': '/api/v1/avatar',
    });
  });
  app.use('/api/v1/users/, function (req, res, next) {
    const { body } = request;
    let counter = 0;
    let missingProps = [];
    ['email', 'password'].forEach(param => {
      if(!body[param]) {
        missingProps.push(param);
      }
    })
    for(let char in body) {
      if(counter > 2) {
        break;
      }
      counter++;
    }
    next()
  })
  app.get('/api/v1/users', userController.show);
  app.post('/api/v1/users', userController.create);
  app.put('/api/v1/users', userController.update);
  app.post('/api/v1/avatar', avatarController.create);
  app.put('/api/v1/avatar', avatarController.update);
  app.delete('/api/v1/avatar', avatarController.delete);
}

module.exports = routes;
