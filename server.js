var express = require('express'),
    routes = require('./routes'),
    engines = require('consolidate');

exports.startServer = function(config, callback) {

  var port = process.env.PORT || config.server.port;

  var app = express();
  var server = app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
  });

  app.configure(function() {
    app.set('port', port);
    app.set('views', config.server.views.path);
    app.engine(config.server.views.extension, engines[config.server.views.compileWith]);
    app.set('view engine', config.server.views.extension);
    app.use(express.favicon());
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(express.compress());
    app.use(config.server.base, app.router);
    app.use(express.static(config.watch.compiledDir));
  });

  app.configure('development', function() {
    app.use(express.errorHandler());
  });

  app.get('/', routes.index(config));

  // initial sync request
  app.get('/sync/attachments', function(req, res) {
    res.json({
      attachments: [
        '/userid/attachments/0F1XXXXXXXXX',
        '/userid/attachments/0F2XXXXXXXXX',
        '/userid/attachments/0F3XXXXXXXXX',
        '/userid/attachments/0F4XXXXXXXXX',
        '/userid/attachments/0F5XXXXXXXXX'
      ] 
    });  
  });

  // specific url for manifest/page containing manifest
  app.get('/userid/attachments/:id', function(req, res) {
    var manifestid = req.params.id;
    res.render('manifest', { manifestid: "../../" + manifestid });
  });

  express.static.mime.define({'text/cache-manifest': ['manifest']});

  callback(server);
};

