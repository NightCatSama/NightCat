(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory);
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