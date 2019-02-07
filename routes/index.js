const userController = require('./controllers/userController');
const avatarController = require('./controllers/avatarController');

export default function(app) {
  app.get('/users', userController.login);
  app.post('/users', userController.signUp);
  app.put('/users', userController.updateStars);
  app.post('/avatar/', avatarController.addAvatar);
  app.put('/avatar', avatarController.updateAvatar);
  app.delete('/avatar', avatarController.deleteAvatar).
};