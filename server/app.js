const service = require('./service');
let figlet = require('figlet');


function welcome() {
  //process.stdout.write('\n=========== Mibrary ===========\n');
  return figlet('Mibrary', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data)
  });
}

module.exports = function () {
  welcome();
  let app = service.createApp();
  app = service.setupWebpack(app);
  app = service.setupStaticRoutes(app);
  app = service.setupMiddlewares(app);
  app = service.setupAppRoutes(app);
  app = service.setupRESTRoutes(app);
  service.setupMongooseConnections();
  return app;
};
