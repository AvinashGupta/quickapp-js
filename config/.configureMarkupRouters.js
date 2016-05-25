// var path = require('path'),
//     _ = require('lodash'),
//     fs = require('fs'),
//     clientApplicationsFolder = '/client-applications/',
//     moduleFiles = require('../app/helpers/moduleFiles');

// /**
//  * Module dependencies.
//  */
// // exports.index = function(req, res) {
// //     var extractedFiles = moduleFiles.get(mainApplication);
// //     res.render('views/index', {
// //         user: req.user || null,
// //         application: {
// //             metaData: mainApplication.metaData,
// //             angular: mainApplication.angular,
// //             css: extractedFiles.css,
// //             js: extractedFiles.js,
// //         }
// //     });
// // };
// exports.createAppsLaunchRoutes = function(app){
// 	app.get('/templates/*', function(req, res) {
//     res.render(path.join('./', req.url.substring(10, req.url.length)),{
//     	require : require
//     });
//   })
//   /** RESTRICT .map FILES REQUEST **/
//   app.get('*', function(req, res, next){
//   	if(_.isString(req.url) && req.url.substring(req.url.length - 4) == '.map'){
//   		res.end('');
//   	}else{
//   		next();
//   	}
//   })

//   var accessUrls=[];
//  	fs.readdirSync(path.join(__dirname, clientApplicationsFolder))
//   .forEach( function (file) {
//   	var application = require(path.join(__dirname, clientApplicationsFolder + file)) || {};
//   	if(application.accessUrl){
//   		if(accessUrls.indexOf(application.accessUrl) > -1){
//   			console.error('Two applications with same accessUrls');
//   			process.exit();
//   		}
//   		accessUrls.push(application.accessUrl);
//   		app.get(application.accessUrl, function(req, res, next){
//   			renderApp(application, req, res, next)
//   		})
//   	}
//   })
// }

// exports.setAppsAsDefaultRoutes = function(app){
//   var accessUrls=[];
//   fs.readdirSync(path.join(__dirname, clientApplicationsFolder))
//   .forEach( function (file) {
//     var application = require(path.join(__dirname, clientApplicationsFolder + file)) || {};
//     if(application.accessUrl){
//       if(accessUrls.indexOf(application.accessUrl) > -1){
//         console.error('Two applications with same accessUrls');
//         process.exit();
//       }
//       accessUrls.push(application.accessUrl);
//       app.get('*', function(req, res, next){
//         if(req.url.substr(0, application.accessUrl.length) == application.accessUrl)
//           renderApp(application, req, res, next);
//         else
//           next();
//       })
//     }
//   }) 
// }

// function renderApp(application, req, res, next) {
//   var extractedFiles = moduleFiles.get(application);
//   res.render('views/.index', {
//     user: req.user || null,
//     // cache: true,
//     // pretty : true,
//     application: {
//       indexFileUrl : application.indexFileUrl,
//       metaData: application.metaData,
//       angular: application.angular,
//       css: extractedFiles.css,
//       js: extractedFiles.js,
//     },
//     require : require
//   });
// }