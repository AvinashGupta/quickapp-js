angular.module('uberstarter.home')
.directive('imgRotator', [
	function(){
		return {
			controller : [function(){
				var rotatedElem = null;
				this.rotateThis = function(thisElem){
					if(thisElem !== rotatedElem){
						rotatedElem && rotatedElem.removeClass('rotate');
						thisElem.addClass('rotate');
						rotatedElem = thisElem;
					}
				}
			}]
		}
	}
])

.directive('imgRotatorItem', [
	function(){
		return {
			require : '^imgRotator',
			link : function(scope, elem, attrs, ctrl){
				elem.bind('click', function(){
					ctrl.rotateThis(elem);
				})
			}
		}
	}
])
