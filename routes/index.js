const userController = require('./controllers/userController');
const avatarController = require('./controllers/avatarController');


//a;sdlkfjas;ldfja;sdlfkjas;dlfkja;sldfj;alsdfja;lsdfj;alsdfj;alsdkfj;lsadfj;alsdfj;alsdj
//a;dslfkjas;dlfkjas;dlfas;dlfasd;lfkjas;dlfa;sldfjas;dlfjkas;dlfja;ljs
export default function(app) {
  app.get('/users', userController.show);
  app.post('/users', userController.create);
  app.put('/users', userController.update);
  app.post('/avatar', avatarController.create);
  app.put('/avatar', avatarController.update);
  app.delete('/avatar', avatarController.delete)
};