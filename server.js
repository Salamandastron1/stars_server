const app = require('./app');

app.set('port', process.env.PORT || 3000);

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
  });
}

module.exports = app;
