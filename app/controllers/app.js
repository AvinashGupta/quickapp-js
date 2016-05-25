var _ = require('lodash'),
    path = require('path'),
    moduleFiles = require('../helpers/moduleFiles');

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
  res.sendFile(path.join(__dirname+'../../../public/views/dashboard.html'));
}