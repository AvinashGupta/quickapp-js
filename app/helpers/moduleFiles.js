'use strict';
var utilities = require('../../config/utilities'),
		_ = require('lodash');

exports.get = function(application){
	var outPutF = {
		css : [],
		js : []
	};
	var appModules = application.angular.modules,
			appCss = application.css,
			appJs = application.js;

	appModules = _.isArray(appModules) ? appModules : [appModules];

	var jsFiles = [], cssFiles = [];

	function stylusToCss(cssArray){
		for(var j=0; j<cssArray.length; j++){	
			cssArray[j] = cssArray[j].replace(/.(styl)$/, '.css');
		}
		return cssArray;
	}
	for(var i=0; i<appModules.length; i++){
		jsFiles.length = 0;
		cssFiles.length = 0;
		jsFiles = utilities.walk('./public/modules/' + appModules[i], /(.*)\.(js)/, /(.*)\.(spec.js)/, './public');
		cssFiles = utilities.walk('./public/modules/' + appModules[i], /(.*)\.(styl)/, null, './public');

		outPutF.js = _.flatten([outPutF.js, jsFiles]);
		outPutF.css = _.flatten([outPutF.css, stylusToCss(cssFiles)]);
	}

	if (appJs) outPutF.js = _.flatten([appJs.vendor, appJs.custom, outPutF.js]);
	if (appCss) outPutF.css = _.flatten([appCss.vendor, stylusToCss(appCss.custom), outPutF.css]);
	
	return outPutF
}