var _ = require('lodash'),
    path = require('path'),
    swig = require('swig'),
    moduleFiles = require('../helpers/moduleFiles');
    
// Disables caching in Swig.
swig.setDefaults({ cache: false });

exports.home = function(req, res, next){
  var extractedFiles = moduleFiles.get({
    angular : {
      modules : 'home'
    }
  });
  res.render('views/home', {
    application: {
      css: extractedFiles.css,
      js: extractedFiles.js,
    },
    require : require,
    // user: req.user || null,
    // cache: true,
    // pretty : true,
  });
}

exports.dashboard = function(req, res, next){
  var tpl = swig.compileFile( path.join(__dirname+'../../../public/views/dashboard.html') );
  var extractedFiles = moduleFiles.get({
    angular : {
      modules : 'home'
    }
  });
  res.send(tpl({
    application: {
      css: extractedFiles.css,
      js: extractedFiles.js,
    },
    require : require,
    // user: req.user || null,
    // cache: true,
    // pretty : true,
  }));
}