const userController = require('./controllers/userController');
const avatarController = require

export default app => {
  app.get('/users', userController.login)
  app.post('/users', userController.signUp)
  app.put('/users/stars', userController.updateStars)
  app.put('/avatar/', userController.avatarChange)
  app.delete('/deleteLogins', isController)
}