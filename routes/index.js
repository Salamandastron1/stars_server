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
  app.get('/api/v1/users', userController.show);
  app.post('/api/v1/users', userController.create);
  app.put('/api/v1/users', userController.update);
  app.post('/api/v1/avatar', avatarController.create);
  app.put('/api/v1/avatar', avatarController.update);
  app.delete('/api/v1/avatar', avatarController.delete);
}

module.exports = routes;
