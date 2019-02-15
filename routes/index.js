const userController = require('./controllers/userController');
const avatarController = require('./controllers/avatarController');

export default function(app) {
  app.get('/users', userController.show);
  app.post('/users', userController.create);
  app.put('/users', userController.update);
  app.post('/avatar', avatarController.create);
  app.put('/avatar', avatarController.update);
  app.delete('/avatar', avatarController.delete)
};