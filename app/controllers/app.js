var _ = require('lodash'),
    moduleFiles = require('../helpers/moduleFiles');

exports.home = function(req, res, next){
  var extractedFiles = moduleFiles.get({
    angular : {
      modules : 'home'
    }
  });
  res.render('views/.index', {
    user: req.user || null,
    // cache: true,
    // pretty : true,
    application: {
      css: extractedFiles.css,
      js: extractedFiles.js,
    },
    require : require
  });
}