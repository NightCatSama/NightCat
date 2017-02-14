/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory();
		} else {
			var mod = {
				exports: {}
			};
			factory();
			global.index = mod.exports;
		}
	})(this, function () {
		'use strict';
	
		/*  技能数据  */
		var skill = {
			'HTML5': 88,
			'CSS3 / SCSS / LESS': 85,
			'Javascript (ES6)': 85,
			'jQuery': 90,
			'React': 70,
			'Vue': 85,
			'NodeJS': 65
		};
	
		/*  漂亮的颜色  */
		var colors = {
			good: '#2ECC71',
			normal: '#2980B9',
			bad: '#E74C3C'
		};
	
		/*  根据数值返回颜色  */
		var getColor = function getColor(score) {
			if (score >= 80) {
				return colors['good'];
			} else if (score >= 50) {
				return colors['normal'];
			} else {
				return colors['bad'];
			}
		};
	
		/*  加载Skill列表  */
		var loadSkill = function loadSkill(data) {
			var str = '';
			for (var name in data) {
				str += '<li>\n\t\t\t<div class="name">' + name + '</div>\n\t\t\t<div class="score-wrap">\n\t\t\t\t<span class="score" style="width: ' + data[name] + '%; background-color: ' + getColor(data[name]) + ';"></span>\n\t\t\t</div>\n\t\t</li>';
			}
	
			console.log(str);
	
			document.querySelector('.skill-list').innerHTML = str;
		};
	
		loadSkill(skill);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map