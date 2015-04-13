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

	outPutF.js = _.flatten([appJs.vendor, appJs.custom, outPutF.js]);
	outPutF.css = _.flatten([appCss.vendor, stylusToCss(appCss.custom), outPutF.css]);
	return outPutF
}