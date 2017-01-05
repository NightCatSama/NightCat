webpackJsonp([1],{

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(36)();
	// imports
	
	
	// module
	exports.push([module.id, ".ReactCat-Modal-Mask {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  left: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.6); }\n", "", {"version":3,"sources":["/./src/components/src/components/Mask/mask.scss"],"names":[],"mappings":"AAAA;EACC,gBAAgB;EAChB,aAAa;EACb,YAAY;EACZ,QAAQ;EACR,OAAO;EACP,qCAAsB,EACtB","file":"mask.scss","sourcesContent":[".ReactCat-Modal-Mask {\r\n\tposition: fixed;\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tbackground-color: rgba(0,0,0,.6);\r\n}"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 113:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(36)();
	// imports
	
	
	// module
	exports.push([module.id, ".factory {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  -webkit-align-self: stretch;\n      -ms-flex-item-align: stretch;\n          align-self: stretch;\n  padding: 10px;\n  margin: 14px;\n  border: 1px solid #fffffb;\n  background-color: #130c0e; }\n  .factory::after {\n    content: attr(data-intro);\n    position: absolute;\n    top: 5px;\n    left: 50%;\n    color: #2ecc71;\n    -webkit-transform: translateX(-50%);\n       -moz-transform: translateX(-50%);\n        -ms-transform: translateX(-50%);\n         -o-transform: translateX(-50%);\n            transform: translateX(-50%); }\n\n.factory-container {\n  position: relative;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin: 10px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n     -moz-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  margin: 30px 20px; }\n  .factory-container .factory-process {\n    position: relative;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n    border: 1px solid #fffffb; }\n    .factory-container .factory-process.entry::before {\n      content: attr(data-port);\n      color: #3498db;\n      position: absolute;\n      left: 10px;\n      top: -25px; }\n    .factory-container .factory-process.export::after {\n      content: attr(data-port);\n      position: absolute;\n      color: #ffd400;\n      right: 10px;\n      bottom: -25px; }\n    .factory-container .factory-process .code-group {\n      position: relative;\n      height: 100%;\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n         -moz-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1; }\n    .factory-container .factory-process .code-index {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      opacity: 0.1;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n         -moz-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n         -moz-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      z-index: 1; }\n    .factory-container .factory-process .code {\n      position: absolute;\n      height: 100%;\n      width: 100%;\n      resize: none;\n      background-color: transparent;\n      color: #fffffb;\n      font-size: 14px;\n      border-right: 1px solid #fffffb;\n      padding: 5px;\n      font-family: 'Montserrat', 'Segoe UI', 'Microsoft Yahei', Helvetica, Arial;\n      z-index: 2; }\n    .factory-container .factory-process .display-area {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: column;\n         -moz-box-orient: vertical;\n         -moz-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      top: 0;\n      right: 0;\n      width: 10%;\n      min-width: 80px;\n      height: 100%;\n      z-index: 2; }\n      .factory-container .factory-process .display-area .display-item {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1;\n           -moz-box-flex: 1;\n            -ms-flex: 1;\n                flex: 1;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n           -moz-box-orient: vertical;\n           -moz-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        margin: 2px 2px 0 2px;\n        padding: 3px 0;\n        text-align: center;\n        border: 1px solid #fffffb; }\n        .factory-container .factory-process .display-area .display-item > div {\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n             -moz-box-flex: 1;\n              -ms-flex: 1;\n                  flex: 1;\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -moz-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: center;\n          -webkit-justify-content: center;\n             -moz-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          -webkit-box-align: center;\n          -webkit-align-items: center;\n             -moz-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center; }\n      .factory-container .factory-process .display-area .item-title {\n        border-bottom: 1px solid #D3DCE6; }\n    .factory-container .factory-process.factory-error::after {\n      content: attr(data-error);\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      padding: 20px;\n      background-color: #d71345;\n      opacity: 0.9;\n      font-size: 40px;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n         -moz-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n         -moz-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      z-index: 5; }\n    .factory-container .factory-process.factory-code-error::after {\n      content: attr(data-error);\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      padding: 20px;\n      background-color: #d71345;\n      opacity: .85;\n      font-size: 18px;\n      z-index: 5; }\n\n.factory-console {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n     -moz-box-orient: vertical;\n     -moz-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n.factory-detector {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 380px;\n  margin-top: 40px; }\n  .factory-detector .factory-group {\n    min-width: 40px;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n       -moz-box-orient: vertical;\n       -moz-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    border: 1px solid #fffffb;\n    margin: 0 10px;\n    color: #fffffb;\n    text-align: center; }\n    .factory-detector .factory-group .factory-group-child-wrap {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n         -moz-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1; }\n    .factory-detector .factory-group .factory-group-child {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: column;\n         -moz-box-orient: vertical;\n         -moz-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n         -moz-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      min-width: 40px;\n      border: 1px solid #fffffb;\n      margin: 1px; }\n    .factory-detector .factory-group .factory-expect-group-wrap {\n      color: #999; }\n    .factory-detector .factory-group .factory-output-group-wrap {\n      color: #fffffb; }\n    .factory-detector .factory-group .factory-item {\n      height: 25px;\n      line-height: 25px;\n      padding: 2px 5px;\n      font-size: 14px; }\n      .factory-detector .factory-group .factory-item > div {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1;\n           -moz-box-flex: 1;\n            -ms-flex: 1;\n                flex: 1;\n        white-space: nowrap;\n        letter-spacing: -0.8px; }\n        .factory-detector .factory-group .factory-item > div span:last-child {\n          opacity: .6; }\n    .factory-detector .factory-group .error {\n      color: #d71345; }\n    .factory-detector .factory-group .success {\n      color: #2ecc71; }\n    .factory-detector .factory-group .active {\n      background-color: #fffffb;\n      color: #130c0e; }\n    .factory-detector .factory-group .group-title {\n      font-size: 12px;\n      padding: 5px 10px;\n      text-align: center;\n      white-space: nowrap;\n      border: 1px solid #fffffb;\n      margin: 1px;\n      color: #fffffb; }\n\n.factory-panel {\n  margin: 10px 0 0 0;\n  padding: 10px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n     -moz-box-orient: vertical;\n     -moz-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  .factory-panel .factory-btn-group, .factory-panel .factory-speed-group {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n       -moz-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-bottom: 10px;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n       -moz-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between; }\n  .factory-panel .factory-panel-btn {\n    border: none;\n    font-size: 16px;\n    color: #fffffb;\n    background-color: transparent;\n    border: 1px solid #fffffb;\n    padding: 8px 0;\n    width: 20%;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n       -moz-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    cursor: pointer; }\n    .factory-panel .factory-panel-btn:not(:last-child) {\n      margin-right: 8px; }\n    .factory-panel .factory-panel-btn:not(.disabled):hover, .factory-panel .factory-panel-btn.active {\n      background-color: #fffffb;\n      color: #130c0e; }\n    .factory-panel .factory-panel-btn.disabled {\n      opacity: .5;\n      cursor: not-allowed; }\n  .factory-panel .factory-speed {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n       -moz-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    text-align: center; }\n  .factory-panel .factory-msg-group {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n       -moz-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n       -moz-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    background-color: #fffffb;\n    color: #130c0e;\n    padding: 5px 10px; }\n", "", {"version":3,"sources":["/./src/routes/factory/lib/src/routes/factory/lib/style/index.scss","/./src/routes/factory/lib/src/routes/factory/lib/style/_util.scss"],"names":[],"mappings":"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","file":"index.scss","sourcesContent":["@import './util';\r\n\r\n$diaplay_width: 10%;\r\n$diaplay_minWidth: 80px;\r\n$detector-width: 380px;\r\n\r\n.factory {\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\tflex: 1;\r\n\talign-self: stretch;\r\n\tpadding: 10px;\r\n\tmargin: 14px;\r\n\tborder: 1px solid $white;\r\n\tbackground-color: $black;\r\n\r\n\t&::after {\r\n\t\tcontent: attr(data-intro);\r\n\t\tposition: absolute;\r\n\t\ttop: 5px;\r\n\t\tleft: 50%;\r\n\t\tcolor: $green;\r\n\t\ttransform: translateX(-50%);\r\n\t}\r\n}\r\n\r\n.factory-container {\r\n\tposition: relative;\r\n\tflex: 1;\r\n\tmargin: 10px;\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\talign-items: center;\r\n\tjustify-content: space-between;\r\n\tmargin: 30px 20px;\r\n\r\n\t.factory-process {\r\n\t\tposition: relative;\r\n\t\tdisplay: flex;\r\n\t\tborder: 1px solid $white;\r\n\r\n\t\t&.entry::before {\r\n\t\t\tcontent: attr(data-port);\r\n\t\t\tcolor: $blue;\r\n\t\t\tposition: absolute;\r\n\t\t\tleft: 10px;\r\n\t\t\ttop: -25px;\r\n\t\t}\r\n\r\n\t\t&.export::after {\r\n\t\t\tcontent: attr(data-port);\r\n\t\t\tposition: absolute;\r\n\t\t\tcolor: $yellow;\r\n\t\t\tright: 10px;\r\n\t\t\tbottom: -25px;\r\n\t\t}\r\n\r\n\t\t.code-group {\r\n\t\t\tposition: relative;\r\n\t\t\theight: 100%;\r\n\t\t\tflex: 1;\r\n\t\t}\r\n\r\n\t\t.code-index {\r\n\t\t\tposition: absolute;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\topacity: 0.1;\r\n\t\t\t@include flex-center;\r\n\t\t\tz-index: 1;\r\n\t\t}\r\n\r\n\t\t.code {\r\n\t\t\tposition: absolute;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tresize: none;\r\n\t\t\tbackground-color: $tr;\r\n\t\t\tcolor: $white;\r\n\t\t\tfont-size: 14px;\r\n\t\t\tborder-right: 1px solid $white;\r\n\t\t\tpadding: 5px;\r\n    \t\tfont-family: 'Montserrat', 'Segoe UI', 'Microsoft Yahei', Helvetica, Arial;\r\n\t\t\tz-index: 2;\r\n\t\t}\r\n\r\n\t\t.display-area {\r\n\t\t\tdisplay: flex;\r\n\t\t\tflex-direction: column;\r\n\t\t\ttop: 0;\r\n\t\t\tright: 0;\r\n\t\t\twidth: $diaplay_width;\r\n\t\t\tmin-width: $diaplay_minWidth;\r\n\t\t\theight: 100%;\r\n\t\t\tz-index: 2;\r\n\r\n\t\t\t.display-item {\r\n\t\t\t\tflex: 1;\r\n\t\t\t\tdisplay: flex;\r\n\t\t\t\tflex-direction: column;\r\n\t\t\t\tmargin: 2px 2px 0 2px;\r\n\t\t\t\tpadding: 3px 0;\r\n\t\t\t\ttext-align: center;\r\n\t\t\t\tborder: 1px solid $white;\r\n\r\n\t\t\t\t>div {\r\n\t\t\t\t\tflex: 1;\r\n\t\t\t\t\t@include flex-center;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\t.item-title {\r\n\t\t\t\tborder-bottom: 1px solid $gray;\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t&.factory-error::after {\r\n\t\t\tcontent: attr(data-error);\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tpadding: 20px;\r\n\t\t\tbackground-color: $red;\r\n\t\t\topacity: 0.9;\r\n\t\t\tfont-size: 40px;\r\n\t\t\t@include flex-center;\r\n\t\t\tz-index: 5;\r\n\t\t}\r\n\r\n\t\t&.factory-code-error::after {\r\n\t\t\tcontent: attr(data-error);\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tpadding: 20px;\r\n\t\t\tbackground-color: $red;\r\n\t\t\topacity: .85;\r\n\t\t\tfont-size: 18px;\r\n\t\t\tz-index: 5;\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.factory-console {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n}\r\n\r\n.factory-detector {\r\n\tdisplay: flex;\r\n\tflex: 1;\r\n\twidth: $detector-width;\r\n\tmargin-top: 40px;\r\n\r\n\t.factory-group {\r\n\t\tmin-width: 40px;\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\tborder: 1px solid $white;\r\n\t\tmargin: 0 10px;\r\n\t\tcolor: $white;\r\n\t\ttext-align: center;\r\n\r\n\t\t.factory-group-child-wrap {\r\n\t\t\tdisplay: flex;\r\n\t\t\tflex: 1;\r\n\t\t}\r\n\r\n\t\t.factory-group-child {\r\n\t\t\tdisplay: flex;\r\n\t\t\tflex-direction: column;\r\n\t\t\tflex: 1;\r\n\t\t\tmin-width: 40px;\r\n\t\t\tborder: 1px solid $white;\r\n\t\t\tmargin: 1px;\r\n\t\t}\r\n\r\n\t\t.factory-expect-group-wrap {\r\n\t\t\tcolor: #999;\r\n\t\t}\r\n\r\n\t\t.factory-output-group-wrap {\r\n\t\t\tcolor: $white;\r\n\t\t}\r\n\r\n\t\t.factory-item {\r\n\t\t\theight: 25px;\r\n\t\t\tline-height: 25px;\r\n\t\t\tpadding: 2px 5px;\r\n\t\t\tfont-size: 14px;\r\n\r\n\t\t\t>div {\r\n\t\t\t\tflex: 1;\r\n\t\t\t\twhite-space: nowrap;\r\n\t\t\t\tletter-spacing: -0.8px;\r\n\r\n\t\t\t\tspan:last-child {\r\n\t\t\t\t\topacity: .6;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t.error {\r\n\t\t\tcolor: $red;\r\n\t\t}\r\n\r\n\t\t.success {\r\n\t\t\tcolor: $green;\r\n\t\t}\r\n\r\n\t\t.active {\r\n\t\t\tbackground-color: $white;\r\n\t\t\tcolor: $black;\r\n\t\t}\r\n\r\n\t\t.group-title {\r\n\t\t\tfont-size: 12px;\r\n\t\t\tpadding: 5px 10px;\r\n\t\t\ttext-align: center;\r\n\t\t\twhite-space: nowrap;\r\n\t\t\tborder: 1px solid $white;\r\n\t\t\tmargin: 1px;\r\n\t\t\tcolor: $white;\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.factory-panel {\r\n\tmargin: 10px 0 0 0;\r\n\tpadding: 10px;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\r\n\t.factory-btn-group, .factory-speed-group {\r\n\t\t@include flex-v-center;\r\n\t\tmargin-bottom: 10px;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\r\n\t.factory-panel-btn {\r\n\t\tborder: none;\r\n\t\tfont-size: 16px;\r\n\t\tcolor: $white;\r\n\t\tbackground-color: $tr;\r\n\t\tborder: 1px solid $white;\r\n\t\tpadding: 8px 0;\r\n\t\twidth: 20%;\r\n\t\tflex: 1;\r\n\t\tcursor: pointer;\r\n\r\n\t\t&:not(:last-child) {\r\n\t\t\tmargin-right: 8px;\r\n\t\t}\r\n\r\n\t\t&:not(.disabled):hover, &.active {\r\n\t\t\tbackground-color: $white;\r\n\t\t\tcolor: $black;\r\n\t\t}\r\n\r\n\t\t&.disabled {\r\n\t\t\topacity: .5;\r\n\t\t\tcursor: not-allowed\r\n\t\t}\r\n\t}\r\n\r\n\t.factory-speed {\r\n\t\tflex: 1;\r\n\t\ttext-align: center;\r\n\t}\r\n\r\n\t.factory-msg-group {\r\n\t\t@include flex-v-center;\r\n\t\tflex: 1;\r\n\t\tbackground-color: $white;\r\n\t\tcolor: $black;\r\n\t\tpadding: 5px 10px;\r\n\t}\r\n}\r\n","//\r\n// Util.scss\r\n// ------------------------\r\n// 此处只有公共变量 @Mixin @Function\r\n// 不生产直接样式\r\n// (=ˋωˊ=)\r\n//\r\n\r\n//**************************************************************\r\n//        项目公共变量\r\n//**************************************************************\r\n$font-light: 0 0 10px rgba(255, 255, 255, .86);\r\n$side-width: 260px;\r\n$slider-time: 0.5s;\r\n\r\n//**************************************************************\r\n//        漂亮的颜色\r\n//**************************************************************\r\n$pink: #f7acbc;\r\n$roseate: #f05b72;\r\n$light-red: #d93a49;\r\n$red: #d71345;\r\n$dark-red: #b22c46;\r\n$orange: #f47920;\r\n$yellow: #ffd400;\r\n$dark-yellow: #ffc20e;\r\n$purple: #9b59b6;\r\n$light-blue: #77d5d4;\r\n$blue: #3498db;\r\n$dark-blue: #2980b9;\r\n$green: #2ecc71;\r\n$light-green: #52be7f;\r\n$dark-green: #27ae60;\r\n$brown: #843900;\r\n$sliver: #8492A6;\r\n$light-sliver: #99A9BF;\r\n$light-black: #324057;\r\n$black: #130c0e;\r\n$white: #fffffb;\r\n$light-gray: #E5E9F2;\r\n$gray: #D3DCE6;\r\n$masstone: #798f9a;\r\n$tr: transparent;\r\n$light-default: #c1c1c1;\r\n$default: #95a5a6;\r\n$default2: #333742;\r\n$dark-default: #7f8c8d;\r\n$font-color: #334455;\r\n$font-color1: $default2;\r\n$bg-color: $light-gray;\r\n$bg-color1: #f2f5f9;\r\n$bg-color2: #f0f0f0;\r\n$light-shadow: 0 0 3px 1px rgba(0, 0, 0, .36);\r\n$shadow: 0 0 5px 3px rgba(0, 0, 0, .16);\r\n$dark-shadow: 0 0 5px 3px rgba(0, 0, 0, .16);\r\n$colors: (roseate $roseate 50%),\r\n(masstone $masstone 30%),\r\n(light-default $light-default 10%),\r\n(default $default 20%),\r\n(default2 $default2 60%),\r\n(light-red $light-red 40%),\r\n(red $red 40%),\r\n(dark-red $dark-red 40%),\r\n(light-blue $light-blue 20%),\r\n(blue $blue 25%),\r\n(dark-blue $dark-blue 20%),\r\n(yellow $yellow 25%),\r\n(light-green $light-green 20%),\r\n(green $green 20%),\r\n(dark-green $dark-green 20%),\r\n(light-black $light-black 40%),\r\n(black $black 50%),\r\n(white $white 0),\r\n(pink $pink 10%),\r\n(orange $orange 30%),\r\n(gray $gray 40%),\r\n(light-gray $light-gray 10%);\r\n$size: (xs 1),\r\n(sm 2),\r\n(md 3),\r\n(lg 4),\r\n(xlg 6),\r\n(xxlg 8),\r\n(xxxlg 10);\r\n$percents: (full 100%),\r\n(half, 50%),\r\n(third, 33%);\r\n$locations: left right top bottom;\r\n$multilocations: (l t), (l b), (r t), (r b), (t l), (t r), (b l), (b r);\r\n$directions: vertical horizontal;\r\n\r\n//**************************************************************\r\n//        生成主题类 Params[componentname, colors]\r\n//**************************************************************\r\n@mixin theme($themes) {\r\n    @each $name, $all in $themes {\r\n        @each $color in $all {\r\n            .#{$name}-#{$color} {\r\n                @extend %#{$name}-#{$color}\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//        多行文字截断 Params[line_count, line-height]\r\n//**************************************************************\r\n@mixin line-ellipsis ($lines, $line-height: 1.3em) {\r\n    text-overflow: ellipsis;\r\n    display: -webkit-box;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-line-clamp: $lines;\r\n    overflow: hidden;\r\n    line-height: $line-height;\r\n    max-height: $line-height * $lines;\r\n}\r\n\r\n//**************************************************************\r\n//        垂直居中\r\n//**************************************************************\r\n@mixin vertical-middle($pos: relative) {\r\n    position: $pos;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n}\r\n\r\n//**************************************************************\r\n//        设置placeholder样式\r\n//**************************************************************\r\n@mixin placeholder($color: #CCC, $font-size: inherit) {\r\n    &::-moz-placeholder {\r\n        color: $color;\r\n        font-size: $font-size;\r\n    }\r\n    &:-ms-input-placeholder {\r\n        color: $color;\r\n        font-size: $font-size;\r\n    }\r\n    &::-webkit-input-placeholder {\r\n        color: $color;\r\n        font-size: $font-size;\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//         flex居中\r\n//**************************************************************\r\n@mixin flex-center($display: flex) {\r\n    display: $display;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n@mixin flex-v-center($display: flex) {\r\n    display: $display;\r\n    align-items: center;\r\n}\r\n@mixin flex-h-center($display: flex) {\r\n    display: $display;\r\n    justify-content: center;\r\n}\r\n\r\n//**************************************************************\r\n//          三角形 Params[大小，颜色，方向]\r\n//**************************************************************\r\n@mixin triangle ($size, $color, $direction) {\r\n    height: 0;\r\n    width: 0;\r\n    //三角向上、向下、向右和向左时，设置边框样式\r\n    @if ($direction==top) or ($direction==bottom) or ($direction==right) or ($direction==left) {\r\n        border-color: transparent;\r\n        border-style: solid;\r\n        border-width: $size / 2;\r\n        //三角向上时，底部边框颜色为$color\r\n        @if $direction==top {\r\n            border-bottom-color: $color;\r\n            //三角向右时，左边边框颜色为$color\r\n        }\r\n        @else if $direction==right {\r\n            border-left-color: $color;\r\n            //三你向下时，顶部边框颜色为$color\r\n        }\r\n        @else if $direction==bottom {\r\n            border-top-color: $color;\r\n            //三角向左时，右边框颜色为$color\r\n        }\r\n        @else if $direction==left {\r\n            border-right-color: $color;\r\n        }\r\n    }\r\n    //当三角为左上、右上直角三角形时\r\n    @else if ($direction==top-right) or ($direction==top-left) {\r\n        border-top: $size solid $color; //顶边边框样式\r\n        //当三角为右上直角三角形时，设置左边边框为透明\r\n        @if $direction==top-right {\r\n            border-left: $size solid transparent;\r\n            //当三角为左上直角三角形时，设置右边边框为透明\r\n        }\r\n        @else if $direction==top-left {\r\n            border-right: $size solid transparent;\r\n        }\r\n    }\r\n    //当三角为右下、左下直角三角形时\r\n    @else if ($direction==bottom-right) or ($direction==bottom-left) {\r\n        border-bottom: $size solid $color; //底边边框样式\r\n        //当三角为右下直角三角形时，设置左边边框为透明\r\n        @if $direction==bottom-right {\r\n            border-left: $size solid transparent;\r\n            //当三你为左下直角三角形时，设置右边边框为透明\r\n        }\r\n        @else if $direction==bottom-left {\r\n            border-right: $size solid transparent;\r\n        }\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//        响应式max-width\r\n//**************************************************************\r\n@mixin max-screen($res) {\r\n    @media ( max-width: $res) {\r\n        @content;\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//        响应式min-width\r\n//**************************************************************\r\n@mixin min-screen($res) {\r\n    @media ( min-width: $res) {\r\n        @content;\r\n    }\r\n}\r\n\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(36)();
	// imports
	
	
	// module
	exports.push([module.id, ".factory-view {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  background-color: #130c0e;\n  color: #fffffb;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n     -moz-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n     -moz-box-orient: vertical;\n     -moz-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  .factory-view .game-prev-group {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n       -moz-box-orient: vertical;\n       -moz-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n       -moz-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .factory-view .game-prev-group.hide {\n      display: none; }\n  .factory-view .title-group {\n    margin: 150px 0 100px 0;\n    position: relative; }\n    .factory-view .title-group .game-title {\n      font-size: 60px;\n      position: relative;\n      -webkit-animation: restlessly 2s infinite;\n         -moz-animation: restlessly 2s infinite;\n           -o-animation: restlessly 2s infinite;\n              animation: restlessly 2s infinite; }\n    .factory-view .title-group .version {\n      font-size: 12px;\n      position: absolute;\n      bottom: 14px;\n      left: 100%;\n      opacity: 0.5; }\n  .factory-view .game-btn {\n    margin-bottom: 20px;\n    border: none;\n    font-size: 30px;\n    background-color: transparent;\n    color: #fffffb;\n    cursor: pointer;\n    -webkit-animation: breathe 5s infinite;\n       -moz-animation: breathe 5s infinite;\n         -o-animation: breathe 5s infinite;\n            animation: breathe 5s infinite; }\n    .factory-view .game-btn:hover {\n      text-shadow: 0 0 5px rgba(255, 255, 255, 0.6); }\n  .factory-view + .menu .menu-btn-outside {\n    color: #fffffb; }\n  .factory-view .game-main {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n       -moz-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    visibility: hidden; }\n    .factory-view .game-main.show {\n      visibility: visible; }\n  .factory-view .game-btn-group {\n    position: absolute;\n    left: 20px;\n    top: 20px;\n    z-index: 9; }\n    .factory-view .game-btn-group button {\n      border: none;\n      font-size: 16px;\n      margin-right: 10px;\n      background-color: transparent;\n      color: #fffffb;\n      cursor: pointer; }\n\n.game-help {\n  position: fixed;\n  color: #130c0e;\n  font-size: 16px;\n  background-color: #fffffb;\n  -webkit-border-radius: 10px;\n     -moz-border-radius: 10px;\n          border-radius: 10px;\n  padding: 20px;\n  z-index: 11;\n  visibility: hidden;\n  -webkit-transform: scale(0.6);\n     -moz-transform: scale(0.6);\n      -ms-transform: scale(0.6);\n       -o-transform: scale(0.6);\n          transform: scale(0.6);\n  opacity: 0;\n  -webkit-transition: all .3s;\n  -o-transition: all .3s;\n  -moz-transition: all .3s;\n  transition: all .3s; }\n  .game-help.show {\n    -webkit-transform: scale(1);\n       -moz-transform: scale(1);\n        -ms-transform: scale(1);\n         -o-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n    visibility: visible; }\n  .game-help section:not(:last-child) {\n    margin-bottom: 30px; }\n  .game-help h3 {\n    color: #2980b9; }\n  .game-help p {\n    margin: 3px 0; }\n  .game-help .icon-close {\n    position: absolute;\n    cursor: pointer;\n    right: 15px;\n    top: 15px; }\n    .game-help .icon-close:hover {\n      opacity: .8; }\n\n@-webkit-keyframes restlessly {\n  0% {\n    text-shadow: 3px 2px 0 #d71345; }\n  20% {\n    text-shadow: 2px -2px 0 #9b59b6; }\n  40% {\n    text-shadow: -4px 2px 0 #D3DCE6; }\n  60% {\n    text-shadow: -3px -2px 0 #27ae60; }\n  80% {\n    text-shadow: 4px 3px 0 #b22c46; }\n  100% {\n    text-shadow: 3px 2px 0 #d71345; } }\n\n@-moz-keyframes restlessly {\n  0% {\n    text-shadow: 3px 2px 0 #d71345; }\n  20% {\n    text-shadow: 2px -2px 0 #9b59b6; }\n  40% {\n    text-shadow: -4px 2px 0 #D3DCE6; }\n  60% {\n    text-shadow: -3px -2px 0 #27ae60; }\n  80% {\n    text-shadow: 4px 3px 0 #b22c46; }\n  100% {\n    text-shadow: 3px 2px 0 #d71345; } }\n\n@-o-keyframes restlessly {\n  0% {\n    text-shadow: 3px 2px 0 #d71345; }\n  20% {\n    text-shadow: 2px -2px 0 #9b59b6; }\n  40% {\n    text-shadow: -4px 2px 0 #D3DCE6; }\n  60% {\n    text-shadow: -3px -2px 0 #27ae60; }\n  80% {\n    text-shadow: 4px 3px 0 #b22c46; }\n  100% {\n    text-shadow: 3px 2px 0 #d71345; } }\n\n@keyframes restlessly {\n  0% {\n    text-shadow: 3px 2px 0 #d71345; }\n  20% {\n    text-shadow: 2px -2px 0 #9b59b6; }\n  40% {\n    text-shadow: -4px 2px 0 #D3DCE6; }\n  60% {\n    text-shadow: -3px -2px 0 #27ae60; }\n  80% {\n    text-shadow: 4px 3px 0 #b22c46; }\n  100% {\n    text-shadow: 3px 2px 0 #d71345; } }\n\n@-webkit-keyframes breathe {\n  0% {\n    opacity: 1;\n    text-shadow: 0 0 0px white; }\n  20% {\n    opacity: 0.9;\n    text-shadow: 0 0 5px white; }\n  40% {\n    opacity: 0.8;\n    text-shadow: 0 0 7px white; }\n  50% {\n    opacity: 0.7;\n    text-shadow: 0 0 10px white; }\n  60% {\n    opacity: 0.8;\n    text-shadow: 0 0 7px white; }\n  80% {\n    opacity: 0.9;\n    text-shadow: 0 0 5px white; }\n  100% {\n    opacity: 1;\n    text-shadow: 0 0 0px white; } }\n\n@-moz-keyframes breathe {\n  0% {\n    opacity: 1;\n    text-shadow: 0 0 0px white; }\n  20% {\n    opacity: 0.9;\n    text-shadow: 0 0 5px white; }\n  40% {\n    opacity: 0.8;\n    text-shadow: 0 0 7px white; }\n  50% {\n    opacity: 0.7;\n    text-shadow: 0 0 10px white; }\n  60% {\n    opacity: 0.8;\n    text-shadow: 0 0 7px white; }\n  80% {\n    opacity: 0.9;\n    text-shadow: 0 0 5px white; }\n  100% {\n    opacity: 1;\n    text-shadow: 0 0 0px white; } }\n\n@-o-keyframes breathe {\n  0% {\n    opacity: 1;\n    text-shadow: 0 0 0px white; }\n  20% {\n    opacity: 0.9;\n    text-shadow: 0 0 5px white; }\n  40% {\n    opacity: 0.8;\n    text-shadow: 0 0 7px white; }\n  50% {\n    opacity: 0.7;\n    text-shadow: 0 0 10px white; }\n  60% {\n    opacity: 0.8;\n    text-shadow: 0 0 7px white; }\n  80% {\n    opacity: 0.9;\n    text-shadow: 0 0 5px white; }\n  100% {\n    opacity: 1;\n    text-shadow: 0 0 0px white; } }\n\n@keyframes breathe {\n  0% {\n    opacity: 1;\n    text-shadow: 0 0 0px white; }\n  20% {\n    opacity: 0.9;\n    text-shadow: 0 0 5px white; }\n  40% {\n    opacity: 0.8;\n    text-shadow: 0 0 7px white; }\n  50% {\n    opacity: 0.7;\n    text-shadow: 0 0 10px white; }\n  60% {\n    opacity: 0.8;\n    text-shadow: 0 0 7px white; }\n  80% {\n    opacity: 0.9;\n    text-shadow: 0 0 5px white; }\n  100% {\n    opacity: 1;\n    text-shadow: 0 0 0px white; } }\n", "", {"version":3,"sources":["/./src/src/stylesheets/factory.scss","/./src/src/stylesheets/common/_util.scss"],"names":[],"mappings":"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","file":"factory.scss","sourcesContent":["@import './common/util';\r\n\r\n.factory-view {\r\n\tflex: 1;\r\n\tbackground-color: $black;\r\n\tcolor: $white;\r\n\tposition: relative;\r\n\t@include flex-center;\r\n\tflex-direction: column;\r\n\r\n\t.game-prev-group {\r\n\t\tposition: fixed;\r\n\t\ttop: 0;\r\n\t\tleft: 0;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\talign-items: center;\r\n\r\n\t\t&.hide {\r\n\t\t\tdisplay: none;\r\n\t\t}\r\n\t}\r\n\r\n\t.title-group {\r\n\t\tmargin: 150px 0 100px 0;\r\n\t\tposition: relative;\r\n\r\n\t\t.game-title {\r\n\t\t\tfont-size: 60px;\r\n\t\t\tposition: relative;\r\n\t\t\tanimation: restlessly 2s infinite;\r\n\t\t}\r\n\r\n\t\t.version {\r\n\t\t\tfont-size: 12px;\r\n\t\t\tposition: absolute;\r\n\t\t\tbottom: 14px;\r\n\t\t\tleft: 100%;\r\n\t\t\topacity: 0.5;\r\n\t\t}\r\n\t}\r\n\r\n\t.game-btn {\r\n\t\tmargin-bottom: 20px;\r\n\t\tborder: none;\r\n\t\tfont-size: 30px;\r\n\t\tbackground-color: $tr;\r\n\t\tcolor: $white;\r\n\t\tcursor: pointer;\r\n\t\tanimation: breathe 5s infinite;\r\n\r\n\t\t&:hover {\r\n\t\t\ttext-shadow: 0 0 5px rgba(255, 255, 255, .6);\r\n\t\t}\r\n\t}\r\n\r\n\t&+.menu .menu-btn-outside {\r\n\t\tcolor: $white;\r\n\t}\r\n\r\n\t.game-main {\r\n\t\tdisplay: flex;\r\n\t\twidth: 100%;\r\n\t\tflex: 1;\r\n\t\tvisibility: hidden;\r\n\r\n\t\t&.show {\r\n\t\t\tvisibility: visible;\r\n\t\t}\r\n\t}\r\n\r\n\t.game-btn-group {\r\n\t\tposition: absolute;\r\n\t\tleft: 20px;\r\n\t\ttop: 20px;\r\n\t\tz-index: 9;\r\n\r\n\t\tbutton {\r\n\t\t\tborder: none;\r\n\t\t\tfont-size: 16px;\r\n\t\t\tmargin-right: 10px;\r\n\t\t\tbackground-color: $tr;\r\n\t\t\tcolor: $white;\r\n\t\t\tcursor: pointer;\r\n\t\t}\r\n\t}\r\n}\r\n\r\n.game-help {\r\n\tposition: fixed;\r\n\tcolor: $black;\r\n\tfont-size: 16px;\r\n\tbackground-color: $white;\r\n\tborder-radius: 10px;\r\n\tpadding: 20px;\r\n\tz-index: 11;\r\n\tvisibility: hidden;\r\n\ttransform: scale(.6);\r\n\topacity: 0;\r\n\ttransition: all .3s;\r\n\r\n\t&.show {\r\n\t\ttransform: scale(1);\r\n\t\topacity: 1;\r\n\t\tvisibility: visible;\r\n\t}\r\n\r\n\tsection:not(:last-child) {\r\n\t\tmargin-bottom: 30px;\r\n\t}\r\n\r\n\th3 {\r\n\t\tcolor: $dark-blue;\r\n\t}\r\n\r\n\tp {\r\n\t\tmargin: 3px 0;\r\n\t}\r\n\r\n\t.icon-close {\r\n\t\tposition: absolute;\r\n\t\tcursor: pointer;\r\n\t\tright: 15px;\r\n\t\ttop: 15px;\r\n\r\n\t\t&:hover {\r\n\t\t\topacity: .8;\r\n\t\t}\r\n\t}\r\n}\r\n\r\n@keyframes restlessly {\r\n\t0% {\r\n\t\ttext-shadow: 3px 2px 0 $red;\r\n\t}\r\n\t20% {\r\n\t\ttext-shadow: 2px -2px 0 $purple;\r\n\t}\r\n\t40% {\r\n\t\ttext-shadow: -4px 2px 0 $gray;\r\n\t}\r\n\t60% {\r\n\t\ttext-shadow: -3px -2px 0 $dark-green;\r\n\t}\r\n\t80% {\r\n\t\ttext-shadow: 4px 3px 0 $dark-red;\r\n\t}\r\n\t100% {\r\n\t\ttext-shadow: 3px 2px 0 $red;\r\n\t}\r\n}\r\n\r\n@keyframes breathe {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttext-shadow: 0 0 0px rgba(255, 255, 255, 1);\r\n\t}\r\n\t20% {\r\n\t\topacity: 0.9;\r\n\t\ttext-shadow: 0 0 5px rgba(255, 255, 255, 1);\r\n\t}\r\n\t40% {\r\n\t\topacity: 0.8;\r\n\t\ttext-shadow: 0 0 7px rgba(255, 255, 255, 1);\r\n\t}\r\n\t50% {\r\n\t\topacity: 0.7;\r\n\t\ttext-shadow: 0 0 10px rgba(255, 255, 255, 1);\r\n\t}\r\n\t60% {\r\n\t\topacity: 0.8;\r\n\t\ttext-shadow: 0 0 7px rgba(255, 255, 255, 1);\r\n\t}\r\n\t80% {\r\n\t\topacity: 0.9;\r\n\t\ttext-shadow: 0 0 5px rgba(255, 255, 255, 1);\r\n\t}\r\n\t100% {\r\n\t\topacity: 1;\r\n\t\ttext-shadow: 0 0 0px rgba(255, 255, 255, 1);\r\n\t}\r\n}\r\n","//\r\n// Util.scss\r\n// ------------------------\r\n// 此处只有公共变量 @Mixin @Function\r\n// 不生产直接样式\r\n// (=ˋωˊ=)\r\n//\r\n\r\n//**************************************************************\r\n//        项目公共变量\r\n//**************************************************************\r\n$font-light: 0 0 10px rgba(255, 255, 255, .86);\r\n$side-width: 260px;\r\n$slider-time: 0.5s;\r\n\r\n//**************************************************************\r\n//        漂亮的颜色\r\n//**************************************************************\r\n$pink: #f7acbc;\r\n$roseate: #f05b72;\r\n$light-red: #d93a49;\r\n$red: #d71345;\r\n$dark-red: #b22c46;\r\n$orange: #f47920;\r\n$yellow: #ffd400;\r\n$dark-yellow: #ffc20e;\r\n$purple: #9b59b6;\r\n$light-blue: #77d5d4;\r\n$blue: #3498db;\r\n$dark-blue: #2980b9;\r\n$green: #2ecc71;\r\n$light-green: #52be7f;\r\n$dark-green: #27ae60;\r\n$brown: #843900;\r\n$sliver: #8492A6;\r\n$light-sliver: #99A9BF;\r\n$light-black: #324057;\r\n$black: #130c0e;\r\n$white: #fffffb;\r\n$light-gray: #E5E9F2;\r\n$gray: #D3DCE6;\r\n$masstone: #798f9a;\r\n$tr: transparent;\r\n$light-default: #c1c1c1;\r\n$default: #95a5a6;\r\n$default2: #333742;\r\n$dark-default: #7f8c8d;\r\n$font-color: #334455;\r\n$font-color1: $default2;\r\n$bg-color: $light-gray;\r\n$bg-color1: #f2f5f9;\r\n$bg-color2: #f0f0f0;\r\n$light-shadow: 0 0 3px 1px rgba(0, 0, 0, .36);\r\n$shadow: 0 0 5px 3px rgba(0, 0, 0, .16);\r\n$dark-shadow: 0 0 5px 3px rgba(0, 0, 0, .16);\r\n$colors: (roseate $roseate 50%),\r\n(masstone $masstone 30%),\r\n(light-default $light-default 10%),\r\n(default $default 20%),\r\n(default2 $default2 60%),\r\n(light-red $light-red 40%),\r\n(red $red 40%),\r\n(dark-red $dark-red 40%),\r\n(light-blue $light-blue 20%),\r\n(blue $blue 25%),\r\n(dark-blue $dark-blue 20%),\r\n(yellow $yellow 25%),\r\n(light-green $light-green 20%),\r\n(green $green 20%),\r\n(dark-green $dark-green 20%),\r\n(light-black $light-black 40%),\r\n(black $black 50%),\r\n(white $white 0),\r\n(pink $pink 10%),\r\n(orange $orange 30%),\r\n(gray $gray 40%),\r\n(light-gray $light-gray 10%);\r\n$size: (xs 1),\r\n(sm 2),\r\n(md 3),\r\n(lg 4),\r\n(xlg 6),\r\n(xxlg 8),\r\n(xxxlg 10);\r\n$percents: (full 100%),\r\n(half, 50%),\r\n(third, 33%);\r\n$locations: left right top bottom;\r\n$multilocations: (l t), (l b), (r t), (r b), (t l), (t r), (b l), (b r);\r\n$directions: vertical horizontal;\r\n\r\n//**************************************************************\r\n//        生成主题类 Params[componentname, colors]\r\n//**************************************************************\r\n@mixin theme($themes) {\r\n    @each $name, $all in $themes {\r\n        @each $color in $all {\r\n            .#{$name}-#{$color} {\r\n                @extend %#{$name}-#{$color}\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//        多行文字截断 Params[line_count, line-height]\r\n//**************************************************************\r\n@mixin line-ellipsis ($lines, $line-height: 1.3em) {\r\n    text-overflow: ellipsis;\r\n    display: -webkit-box;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-line-clamp: $lines;\r\n    overflow: hidden;\r\n    line-height: $line-height;\r\n    max-height: $line-height * $lines;\r\n}\r\n\r\n//**************************************************************\r\n//        垂直居中\r\n//**************************************************************\r\n@mixin vertical-middle($pos: relative) {\r\n    position: $pos;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n}\r\n\r\n//**************************************************************\r\n//        设置placeholder样式\r\n//**************************************************************\r\n@mixin placeholder($color: #CCC, $font-size: inherit) {\r\n    &::-moz-placeholder {\r\n        color: $color;\r\n        font-size: $font-size;\r\n    }\r\n    &:-ms-input-placeholder {\r\n        color: $color;\r\n        font-size: $font-size;\r\n    }\r\n    &::-webkit-input-placeholder {\r\n        color: $color;\r\n        font-size: $font-size;\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//         flex居中\r\n//**************************************************************\r\n@mixin flex-center($display: flex) {\r\n    display: $display;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n@mixin flex-v-center($display: flex) {\r\n    display: $display;\r\n    align-items: center;\r\n}\r\n@mixin flex-h-center($display: flex) {\r\n    display: $display;\r\n    justify-content: center;\r\n}\r\n\r\n//**************************************************************\r\n//          三角形 Params[大小，颜色，方向]\r\n//**************************************************************\r\n@mixin triangle ($size, $color, $direction) {\r\n    height: 0;\r\n    width: 0;\r\n    //三角向上、向下、向右和向左时，设置边框样式\r\n    @if ($direction==top) or ($direction==bottom) or ($direction==right) or ($direction==left) {\r\n        border-color: transparent;\r\n        border-style: solid;\r\n        border-width: $size / 2;\r\n        //三角向上时，底部边框颜色为$color\r\n        @if $direction==top {\r\n            border-bottom-color: $color;\r\n            //三角向右时，左边边框颜色为$color\r\n        }\r\n        @else if $direction==right {\r\n            border-left-color: $color;\r\n            //三你向下时，顶部边框颜色为$color\r\n        }\r\n        @else if $direction==bottom {\r\n            border-top-color: $color;\r\n            //三角向左时，右边框颜色为$color\r\n        }\r\n        @else if $direction==left {\r\n            border-right-color: $color;\r\n        }\r\n    }\r\n    //当三角为左上、右上直角三角形时\r\n    @else if ($direction==top-right) or ($direction==top-left) {\r\n        border-top: $size solid $color; //顶边边框样式\r\n        //当三角为右上直角三角形时，设置左边边框为透明\r\n        @if $direction==top-right {\r\n            border-left: $size solid transparent;\r\n            //当三角为左上直角三角形时，设置右边边框为透明\r\n        }\r\n        @else if $direction==top-left {\r\n            border-right: $size solid transparent;\r\n        }\r\n    }\r\n    //当三角为右下、左下直角三角形时\r\n    @else if ($direction==bottom-right) or ($direction==bottom-left) {\r\n        border-bottom: $size solid $color; //底边边框样式\r\n        //当三角为右下直角三角形时，设置左边边框为透明\r\n        @if $direction==bottom-right {\r\n            border-left: $size solid transparent;\r\n            //当三你为左下直角三角形时，设置右边边框为透明\r\n        }\r\n        @else if $direction==bottom-left {\r\n            border-right: $size solid transparent;\r\n        }\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//        响应式max-width\r\n//**************************************************************\r\n@mixin max-screen($res) {\r\n    @media ( max-width: $res) {\r\n        @content;\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//        响应式min-width\r\n//**************************************************************\r\n@mixin min-screen($res) {\r\n    @media ( min-width: $res) {\r\n        @content;\r\n    }\r\n}\r\n\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(36)();
	// imports
	
	
	// module
	exports.push([module.id, ".home-view {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  position: relative;\n  background-image: url(" + __webpack_require__(679) + ");\n  background-repeat: no-repeat;\n  -moz-background-size: cover;\n    -o-background-size: cover;\n       background-size: cover;\n  cursor: default; }\n  .home-view .info {\n    color: #fffffb;\n    position: relative;\n    font-size: 20px;\n    margin: 120px 0 0 60px;\n    width: 300px;\n    text-shadow: 0 0 10px rgba(255, 255, 255, 0.86);\n    text-align: center; }\n  .home-view + .menu .menu-btn-outside {\n    text-shadow: 0 0 10px rgba(255, 255, 255, 0.86);\n    color: #fffffb; }\n", "", {"version":3,"sources":["/./src/src/stylesheets/home.scss","/./src/src/stylesheets/common/_util.scss"],"names":[],"mappings":"AAEA;EACC,oBAAQ;EAAR,gBAAQ;KAAR,iBAAQ;MAAR,YAAQ;UAAR,QAAQ;EACR,mBAAmB;EACnB,gDAAqB;EACrB,6BAA6B;EAC7B,4BAAuB;IAAvB,0BAAuB;OAAvB,uBAAuB;EACvB,gBAAgB,EAgBhB;EAtBD;IASE,eC2Ba;ID1Bb,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;IACvB,aAAa;IACb,gDCLwB;IDMxB,mBAAmB,EACnB;EAhBF;IAmBE,gDCVwB;IDWxB,eCgBa,EDfb","file":"home.scss","sourcesContent":["@import './common/util';\r\n\r\n.home-view {\r\n\tflex: 1;\r\n\tposition: relative;\r\n\tbackground-image: url('../images/bg.jpg');\r\n\tbackground-repeat: no-repeat;\r\n\tbackground-size: cover;\r\n\tcursor: default;\r\n\r\n\t.info {\r\n\t\tcolor: $white;\r\n\t\tposition: relative;\r\n\t\tfont-size: 20px;\r\n\t\tmargin: 120px 0 0 60px;\r\n\t\twidth: 300px;\r\n\t\ttext-shadow: $font-light;\r\n\t\ttext-align: center;\r\n\t}\r\n\r\n\t&+.menu .menu-btn-outside {\r\n\t\ttext-shadow: $font-light;\r\n\t\tcolor: $white;\r\n\t}\r\n}\r\n","//\r\n// Util.scss\r\n// ------------------------\r\n// 此处只有公共变量 @Mixin @Function\r\n// 不生产直接样式\r\n// (=ˋωˊ=)\r\n//\r\n\r\n//**************************************************************\r\n//        项目公共变量\r\n//**************************************************************\r\n$font-light: 0 0 10px rgba(255, 255, 255, .86);\r\n$side-width: 260px;\r\n$slider-time: 0.5s;\r\n\r\n//**************************************************************\r\n//        漂亮的颜色\r\n//**************************************************************\r\n$pink: #f7acbc;\r\n$roseate: #f05b72;\r\n$light-red: #d93a49;\r\n$red: #d71345;\r\n$dark-red: #b22c46;\r\n$orange: #f47920;\r\n$yellow: #ffd400;\r\n$dark-yellow: #ffc20e;\r\n$purple: #9b59b6;\r\n$light-blue: #77d5d4;\r\n$blue: #3498db;\r\n$dark-blue: #2980b9;\r\n$green: #2ecc71;\r\n$light-green: #52be7f;\r\n$dark-green: #27ae60;\r\n$brown: #843900;\r\n$sliver: #8492A6;\r\n$light-sliver: #99A9BF;\r\n$light-black: #324057;\r\n$black: #130c0e;\r\n$white: #fffffb;\r\n$light-gray: #E5E9F2;\r\n$gray: #D3DCE6;\r\n$masstone: #798f9a;\r\n$tr: transparent;\r\n$light-default: #c1c1c1;\r\n$default: #95a5a6;\r\n$default2: #333742;\r\n$dark-default: #7f8c8d;\r\n$font-color: #334455;\r\n$font-color1: $default2;\r\n$bg-color: $light-gray;\r\n$bg-color1: #f2f5f9;\r\n$bg-color2: #f0f0f0;\r\n$light-shadow: 0 0 3px 1px rgba(0, 0, 0, .36);\r\n$shadow: 0 0 5px 3px rgba(0, 0, 0, .16);\r\n$dark-shadow: 0 0 5px 3px rgba(0, 0, 0, .16);\r\n$colors: (roseate $roseate 50%),\r\n(masstone $masstone 30%),\r\n(light-default $light-default 10%),\r\n(default $default 20%),\r\n(default2 $default2 60%),\r\n(light-red $light-red 40%),\r\n(red $red 40%),\r\n(dark-red $dark-red 40%),\r\n(light-blue $light-blue 20%),\r\n(blue $blue 25%),\r\n(dark-blue $dark-blue 20%),\r\n(yellow $yellow 25%),\r\n(light-green $light-green 20%),\r\n(green $green 20%),\r\n(dark-green $dark-green 20%),\r\n(light-black $light-black 40%),\r\n(black $black 50%),\r\n(white $white 0),\r\n(pink $pink 10%),\r\n(orange $orange 30%),\r\n(gray $gray 40%),\r\n(light-gray $light-gray 10%);\r\n$size: (xs 1),\r\n(sm 2),\r\n(md 3),\r\n(lg 4),\r\n(xlg 6),\r\n(xxlg 8),\r\n(xxxlg 10);\r\n$percents: (full 100%),\r\n(half, 50%),\r\n(third, 33%);\r\n$locations: left right top bottom;\r\n$multilocations: (l t), (l b), (r t), (r b), (t l), (t r), (b l), (b r);\r\n$directions: vertical horizontal;\r\n\r\n//**************************************************************\r\n//        生成主题类 Params[componentname, colors]\r\n//**************************************************************\r\n@mixin theme($themes) {\r\n    @each $name, $all in $themes {\r\n        @each $color in $all {\r\n            .#{$name}-#{$color} {\r\n                @extend %#{$name}-#{$color}\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//        多行文字截断 Params[line_count, line-height]\r\n//**************************************************************\r\n@mixin line-ellipsis ($lines, $line-height: 1.3em) {\r\n    text-overflow: ellipsis;\r\n    display: -webkit-box;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-line-clamp: $lines;\r\n    overflow: hidden;\r\n    line-height: $line-height;\r\n    max-height: $line-height * $lines;\r\n}\r\n\r\n//**************************************************************\r\n//        垂直居中\r\n//**************************************************************\r\n@mixin vertical-middle($pos: relative) {\r\n    position: $pos;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n}\r\n\r\n//**************************************************************\r\n//        设置placeholder样式\r\n//**************************************************************\r\n@mixin placeholder($color: #CCC, $font-size: inherit) {\r\n    &::-moz-placeholder {\r\n        color: $color;\r\n        font-size: $font-size;\r\n    }\r\n    &:-ms-input-placeholder {\r\n        color: $color;\r\n        font-size: $font-size;\r\n    }\r\n    &::-webkit-input-placeholder {\r\n        color: $color;\r\n        font-size: $font-size;\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//         flex居中\r\n//**************************************************************\r\n@mixin flex-center($display: flex) {\r\n    display: $display;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n@mixin flex-v-center($display: flex) {\r\n    display: $display;\r\n    align-items: center;\r\n}\r\n@mixin flex-h-center($display: flex) {\r\n    display: $display;\r\n    justify-content: center;\r\n}\r\n\r\n//**************************************************************\r\n//          三角形 Params[大小，颜色，方向]\r\n//**************************************************************\r\n@mixin triangle ($size, $color, $direction) {\r\n    height: 0;\r\n    width: 0;\r\n    //三角向上、向下、向右和向左时，设置边框样式\r\n    @if ($direction==top) or ($direction==bottom) or ($direction==right) or ($direction==left) {\r\n        border-color: transparent;\r\n        border-style: solid;\r\n        border-width: $size / 2;\r\n        //三角向上时，底部边框颜色为$color\r\n        @if $direction==top {\r\n            border-bottom-color: $color;\r\n            //三角向右时，左边边框颜色为$color\r\n        }\r\n        @else if $direction==right {\r\n            border-left-color: $color;\r\n            //三你向下时，顶部边框颜色为$color\r\n        }\r\n        @else if $direction==bottom {\r\n            border-top-color: $color;\r\n            //三角向左时，右边框颜色为$color\r\n        }\r\n        @else if $direction==left {\r\n            border-right-color: $color;\r\n        }\r\n    }\r\n    //当三角为左上、右上直角三角形时\r\n    @else if ($direction==top-right) or ($direction==top-left) {\r\n        border-top: $size solid $color; //顶边边框样式\r\n        //当三角为右上直角三角形时，设置左边边框为透明\r\n        @if $direction==top-right {\r\n            border-left: $size solid transparent;\r\n            //当三角为左上直角三角形时，设置右边边框为透明\r\n        }\r\n        @else if $direction==top-left {\r\n            border-right: $size solid transparent;\r\n        }\r\n    }\r\n    //当三角为右下、左下直角三角形时\r\n    @else if ($direction==bottom-right) or ($direction==bottom-left) {\r\n        border-bottom: $size solid $color; //底边边框样式\r\n        //当三角为右下直角三角形时，设置左边边框为透明\r\n        @if $direction==bottom-right {\r\n            border-left: $size solid transparent;\r\n            //当三你为左下直角三角形时，设置右边边框为透明\r\n        }\r\n        @else if $direction==bottom-left {\r\n            border-right: $size solid transparent;\r\n        }\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//        响应式max-width\r\n//**************************************************************\r\n@mixin max-screen($res) {\r\n    @media ( max-width: $res) {\r\n        @content;\r\n    }\r\n}\r\n\r\n//**************************************************************\r\n//        响应式min-width\r\n//**************************************************************\r\n@mixin min-screen($res) {\r\n    @media ( min-width: $res) {\r\n        @content;\r\n    }\r\n}\r\n\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(341), __esModule: true };

/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _reduxActions = __webpack_require__(158);
	
	var _HeaderBtnType = __webpack_require__(162);
	
	var ActionTypes = _interopRequireWildcard(_HeaderBtnType);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var HeaderBtnActions = {
		register: (0, _reduxActions.createAction)(ActionTypes.RESGISTER_EVENT, function (type, fn, data) {
			return {
				type: type,
				fn: fn,
				data: data
			};
		}),
		execute: (0, _reduxActions.createAction)(ActionTypes.EXECUTE)
	};
	
	exports.default = HeaderBtnActions;

/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(32);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(11);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(17);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(22);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(18);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(669);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Mask = function (_Component) {
		(0, _inherits3.default)(Mask, _Component);
	
		function Mask(props) {
			(0, _classCallCheck3.default)(this, Mask);
			return (0, _possibleConstructorReturn3.default)(this, (Mask.__proto__ || (0, _getPrototypeOf2.default)(Mask)).call(this, props));
		}
	
		(0, _createClass3.default)(Mask, [{
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var style = {
					display: this.props.show ? 'block' : 'none',
					zIndex: this.props.zIndex || 0
				};
				return _react2.default.createElement('div', { ref: function ref(_ref) {
						return _this2.mask = _ref;
					}, style: style, className: 'ReactCat-Modal-Mask', onClick: this.props.onClick });
			}
		}]);
		return Mask;
	}(_react.Component);
	
	exports.default = Mask;
	
	
	Mask.propTypes = {
		show: _react.PropTypes.bool,
		zIndex: _react.PropTypes.number,
		onClick: _react.PropTypes.func
	};
	
	Mask.defaultProps = {
		show: false
	};

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(32);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(11);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(17);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(22);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(18);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(170);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Mask = __webpack_require__(270);
	
	var _Mask2 = _interopRequireDefault(_Mask);
	
	__webpack_require__(674);
	
	var _Factory = __webpack_require__(280);
	
	var _Factory2 = _interopRequireDefault(_Factory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var component = function (_Component) {
		(0, _inherits3.default)(component, _Component);
	
		function component(props) {
			(0, _classCallCheck3.default)(this, component);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (component.__proto__ || (0, _getPrototypeOf2.default)(component)).call(this, props));
	
			_this.state = {
				gameProgress: 100,
				gameSign: false,
				helpShow: false,
				word: 'Game Start',
				game: null
			};
			_this.switchState = _this.switchState.bind(_this);
			_this.toggleHelp = _this.toggleHelp.bind(_this);
			_this.clickFn = _this.clickFn.bind(_this);
			return _this;
		}
	
		(0, _createClass3.default)(component, [{
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}, {
			key: 'switchState',
			value: function switchState() {
				var obj = {
					gameSign: !this.state.gameSign
				};
				if (!this.state.game) {
					obj.game = new _Factory2.default(this.refs.factory);
				} else {
					obj.word = 'Continue';
				}
				this.setState(obj);
			}
		}, {
			key: 'toggleHelp',
			value: function toggleHelp() {
				this.setState({
					helpShow: !this.state.helpShow
				});
			}
		}, {
			key: 'clickFn',
			value: function clickFn() {
				this.state.game.start();
			}
		}, {
			key: 'render',
			value: function render() {
				var GameClass = (0, _classnames2.default)('game-main', {
					show: this.state.gameSign
				});
				var HelpClass = (0, _classnames2.default)('game-help', {
					show: this.state.helpShow
				});
				var GroupClass = (0, _classnames2.default)('game-prev-group', {
					hide: this.state.gameSign
				});
				return _react2.default.createElement(
					'div',
					{ ref: 'view', className: 'factory-view' },
					_react2.default.createElement(_Mask2.default, { show: this.state.helpShow, onClick: this.toggleHelp, zIndex: 8 }),
					_react2.default.createElement(
						'div',
						{ className: GroupClass },
						_react2.default.createElement(
							'section',
							{ className: 'title-group' },
							_react2.default.createElement(
								'h1',
								{ className: 'game-title' },
								'Factory'
							),
							_react2.default.createElement(
								'small',
								{ className: 'version' },
								'beta'
							)
						),
						_react2.default.createElement(
							'button',
							{ className: 'game-btn', onClick: this.switchState },
							this.state.word
						),
						_react2.default.createElement(
							'button',
							{ className: 'game-btn', onClick: this.toggleHelp },
							'Help'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: GameClass },
						_react2.default.createElement(
							'div',
							{ className: 'game-btn-group' },
							_react2.default.createElement(
								'button',
								{ onClick: this.switchState },
								_react2.default.createElement('i', { className: 'iconfont icon-left' })
							),
							_react2.default.createElement(
								'button',
								{ onClick: this.toggleHelp },
								'Help'
							)
						),
						_react2.default.createElement('div', { ref: 'factory', className: 'factory' })
					),
					_react2.default.createElement(
						'div',
						{ className: HelpClass },
						_react2.default.createElement('i', { className: 'iconfont icon-close', onClick: this.toggleHelp }),
						_react2.default.createElement(
							'section',
							null,
							_react2.default.createElement(
								'h3',
								null,
								'\u901A\u5173\u6761\u4EF6'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								'\u6240\u6709\u8F93\u51FA\u503C(OUT)\u5747\u5DF2\u671F\u671B\u503C(EXP)\u76F8\u7B49'
							)
						),
						_react2.default.createElement(
							'section',
							null,
							_react2.default.createElement(
								'h3',
								null,
								'\u5185\u7F6E\u53D8\u91CF'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								_react2.default.createElement(
									'span',
									null,
									'NEXT\uFF1A'
								),
								'\u7531\u5165\u53E3INPUT\u6216\u8005\u4E0A\u4E2A\u5904\u7406\u5668(Processor)\u4F20\u8FC7\u6765\u7684\u503C, \u4E0B\u6B21\u6267\u884C\u65F6\u8986\u76D6ACC\u503C'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								_react2.default.createElement(
									'span',
									null,
									'ACC\uFF1A'
								),
								'\u4E00\u4E2A\u4ECE\u5165\u53E3\u8F93\u5165(INPUT), \u7ECF\u8FC7\u5904\u7406\u5230\u6700\u7EC8\u8F93\u51FA(OUTPUT)\u5BF9\u5E94\u7684\u7ED3\u679C\u7684\u503C'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								_react2.default.createElement(
									'span',
									null,
									'COM\uFF1A'
								),
								'\u5904\u7406\u5668(Processor)\u7684\u5B58\u50A8\u503C, \u53EA\u80FD\u901A\u8FC7\u65B9\u6CD5C\u53BB\u83B7\u53D6\u6216\u8BBE\u7F6E'
							)
						),
						_react2.default.createElement(
							'section',
							null,
							_react2.default.createElement(
								'h3',
								null,
								'\u5185\u7F6E\u65B9\u6CD5'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								_react2.default.createElement(
									'span',
									null,
									'T\uFF1A'
								),
								'\u53C2\u6570\u7F3A\u7701\u65F6\u4E3A\u4F20\u9012ACC, \u4F20\u5411\u4E0A\u65B9\u7684\u5904\u7406\u5668(Processor), \u5F53\u8BE5\u65B9\u5411\u662FOUTPUT\u65F6\u4E3A\u8F93\u51FA\u7ED3\u679C'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								_react2.default.createElement(
									'span',
									null,
									'B\uFF1A'
								),
								'\u53C2\u6570\u7F3A\u7701\u65F6\u4E3A\u4F20\u9012ACC, \u4F20\u5411\u4E0B\u65B9\u7684\u5904\u7406\u5668(Processor), \u5F53\u8BE5\u65B9\u5411\u662FOUTPUT\u65F6\u4E3A\u8F93\u51FA\u7ED3\u679C'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								_react2.default.createElement(
									'span',
									null,
									'L\uFF1A'
								),
								'\u53C2\u6570\u7F3A\u7701\u65F6\u4E3A\u4F20\u9012ACC, \u4F20\u5411\u5DE6\u65B9\u7684\u5904\u7406\u5668(Processor), \u5F53\u8BE5\u65B9\u5411\u662FOUTPUT\u65F6\u4E3A\u8F93\u51FA\u7ED3\u679C'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								_react2.default.createElement(
									'span',
									null,
									'R\uFF1A'
								),
								'\u53C2\u6570\u7F3A\u7701\u65F6\u4E3A\u4F20\u9012ACC, \u4F20\u5411\u53F3\u65B9\u7684\u5904\u7406\u5668(Processor), \u5F53\u8BE5\u65B9\u5411\u662FOUTPUT\u65F6\u4E3A\u8F93\u51FA\u7ED3\u679C'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								_react2.default.createElement(
									'span',
									null,
									'C\uFF1A'
								),
								'\u8BBE\u7F6E\u5B58\u50A8\u503C(COM), \u53C2\u6570\u7F3A\u7701\u65F6\u4E3A\u6E05\u7A7A\u5B58\u50A8\u503C(ACC)'
							)
						),
						_react2.default.createElement(
							'section',
							null,
							_react2.default.createElement(
								'h3',
								null,
								'\u63D0\u793A'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								'\u4F7F\u7528ES6\u80FD\u8BA9\u4EE3\u7801\u66F4\u52A0\u7CBE\u7B80(\u524D\u63D0\u4F60\u7684\u6D4F\u89C8\u5668\u652F\u6301)'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								'\u8BF7\u9075\u5B88\u6E38\u620F\u89C4\u5219, \u4E0D\u8981\u4F7F\u7528window\u6216\u8005WebStorage\u7B49\u9ED1\u79D1\u6280\uFF01'
							)
						),
						_react2.default.createElement(
							'section',
							null,
							_react2.default.createElement(
								'h3',
								null,
								'\u611F\u8A00'
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								'\u5F53\u524D\u4E3A\u6D4B\u8BD5\u7248\u672C, \u5982\u679C\u6709BUG\u5E0C\u671B\u80FD\u53CD\u9988\u7ED9\u6211',
								_react2.default.createElement(
									'a',
									{ href: 'https://nightcatsama.github.io/NightCat/dist/', target: '_blank' },
									'ISSUE'
								)
							),
							_react2.default.createElement(
								'p',
								{ className: 'help-item' },
								'\u5982\u679C\u4F60\u60F3\u53C2\u4E0E\u5173\u5361\u8BBE\u8BA1, \u4E5F\u53EF\u4EE5\u544A\u8BC9\u6211\u3002\u6211\u7684GITHUB\u5730\u5740\u4E3A\uFF1A',
								_react2.default.createElement(
									'a',
									{ href: 'https://github.com/NightCatSama/NightCat', target: '_blank' },
									'https://github.com/NightCatSama/NightCat'
								)
							)
						)
					)
				);
			}
		}]);
		return component;
	}(_react.Component);
	
	exports.default = component;
	
	
	component.propTypes = {};

/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _keys = __webpack_require__(45);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _typeof2 = __webpack_require__(60);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _stringify = __webpack_require__(163);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _from = __webpack_require__(70);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _assign = __webpack_require__(58);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(11);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(17);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _default = {};
	
	var Detector = function () {
		function Detector(options) {
			(0, _classCallCheck3.default)(this, Detector);
	
			(0, _assign2.default)(this, _default, options);
			this.init();
		}
	
		(0, _createClass3.default)(Detector, [{
			key: 'init',
			value: function init() {
				this.items = [];
				this.active = null;
				this.last_output = 0;
				this.success_count = 0;
				this.output_active = null;
				this.createDetector();
				this.initIems();
				this.render();
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.success_count = 0;
				this.setActive(null, this.input_group);
				if (this.isMultigroup) {
					this.last_output = {};
					for (var key in this.output_group) {
						this.last_output[key] = 0;
						this.setActive(null, this.output_group[key].output_cgroup);
					}
					(0, _from2.default)(this.items, function (obj) {
						obj.output = {};
						for (var i in obj.output_el) {
							obj.output_el[i].textContent = '';
							obj.output_el[i].className = 'factory-item';
						}
					});
				} else {
					this.last_output = 0;
					this.setActive(null, this.output_group);
					(0, _from2.default)(this.items, function (obj) {
						obj.output_el.textContent = '';
						obj.output_el.className = 'factory-item';
					});
				}
			}
		}, {
			key: 'createDetector',
			value: function createDetector() {
				this.elem = document.createElement('DIV');
				this.elem.className = 'factory-detector';
				if (this.isMultigroup) {
					this.output_group = {};
					this.last_output = {};
					this.input_group = this.createGroup('IN');
					for (var key in this.data[0].expectant_output) {
						this.output_group[key] = {};
						this.last_output[key] = 0;
						this.output_group[key].el = this.createGroup('OUT.' + key);
						var el = document.createElement('DIV');
						el.className = 'factory-group-child-wrap';
						this.output_group[key].expect_cgroup = this.createChildGroup(el, 'factory-expect-group-wrap');
						this.output_group[key].output_cgroup = this.createChildGroup(el, 'factory-output-group-wrap');
						this.output_group[key].exports = [];
						this.output_group[key].output = [];
						this.output_group[key].el.appendChild(el);
					}
				} else {
					this.input_group = this.createGroup('IN');
					this.output_group = this.createGroup('OUT');
					this.expect_group = this.createGroup('EXP');
				}
				this.wrap.firstChild ? this.wrap.insertBefore(this.elem, this.wrap.firstChild) : this.wrap.appendChild(this.elem);
			}
		}, {
			key: 'createGroup',
			value: function createGroup(name) {
				var elem = document.createElement('DIV');
				elem.className = 'factory-group';
				elem.innerHTML = '<div class="group-title">' + name + '</div>';
				this.elem.appendChild(elem);
				return elem;
			}
		}, {
			key: 'createChildGroup',
			value: function createChildGroup(wrap, className) {
				var elem = document.createElement('DIV');
				elem.className = 'factory-group-child ' + className;
				wrap.appendChild(elem);
				return elem;
			}
		}, {
			key: 'createOutputGroup',
			value: function createOutputGroup(name) {
				var elem = document.createElement('DIV');
				elem.className = 'factory-group';
				elem.innerHTML = '<div class="group-title">' + name + '</div>';
				this.this.elem.appendChild(elem);
				return elem;
			}
		}, {
			key: 'createItem',
			value: function createItem(value, index, wrap) {
				var elem = document.createElement('DIV');
				elem.className = 'factory-item';
				elem.innerHTML = value !== null ? (0, _stringify2.default)(value) : '';
				elem.setAttribute('data-index', index);
				wrap.appendChild(elem);
				return elem;
			}
		}, {
			key: 'initIems',
			value: function initIems() {
				this.items = (0, _from2.default)(this.data, function (obj, i) {
					return (0, _assign2.default)({
						index: i
					}, obj);
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this = this;
	
				(0, _from2.default)(this.items, function (obj, i) {
					if (_this.isMultigroup) {
						_this.createItem(obj.input, i, _this.input_group);
						obj.output_el = {};
						obj.output = {};
						for (var key in obj.expectant_output) {
							var val = obj.expectant_output[key];
							obj.output_el[key] = _this.createItem(null, i, _this.output_group[key].output_cgroup);
							_this.createItem(val, i, _this.output_group[key].expect_cgroup);
							_this.output_group[key].exports.push(val);
						}
					} else {
						_this.createItem(obj.input, i, _this.input_group);
						obj.output_el = _this.createItem(obj.output, i, _this.output_group);
						_this.createItem(obj.expectant_output, i, _this.expect_group);
					}
				});
			}
		}, {
			key: 'setInputActive',
			value: function setInputActive(index) {
				this.setActive(index, this.input_group);
			}
		}, {
			key: 'setActive',
			value: function setActive(index, wrap) {
				var active = wrap.querySelector('.active');
				active && active.classList.remove('active');
				if (typeof index === 'number') {
					var elem = wrap.querySelector('[data-index="' + index + '"]');
					elem && elem.classList.add('active');
				}
			}
		}, {
			key: 'output',
			value: function output(val, key) {
				var index = this.isMultigroup ? this.last_output[key] : this.last_output;
				if (this.isMultigroup) {
					var obj = this.output_group[key];
					if (index < this.data.length) {
						var exp = obj.exports[index];
						var output_el = this.items[index].output_el[key];
						var mObj = {
							output: val,
							expectant_output: exp,
							output_el: output_el
						};
						this.items[index].output[key] = obj.output[index] = val;
						output_el.textContent = val !== null ? (0, _stringify2.default)(val) : '';
						this.examine(index, mObj);
						this.setActive(index++, obj.output_cgroup);
						this.last_output[key] = index;
						if (index === this.data.length) {
							this.setActive(null, obj.output_cgroup);
						}
					}
				} else {
					if (index < this.data.length) {
						this.items[index].output = val;
						this.items[index].output_el.textContent = val !== null ? (0, _stringify2.default)(val) : '';
						this.examine(index);
						this.setActive(index++, this.output_group);
						this.last_output = index;
						if (index === this.data.length) {
							this.setActive(null, this.output_group);
						}
					}
				}
			}
		}, {
			key: 'examine',
			value: function examine(index, mObj) {
				var obj = mObj || this.items[index];
				if (this.isDiff(obj.output, obj.expectant_output)) {
					obj.output_el.classList.add('error');
				} else {
					if (this.isMultigroup) {
						if (!this.isDiff(this.items[index].output, this.items[index].expectant_output)) {
							this.success_count++;
						}
					} else {
						this.success_count++;
					}
					obj.output_el.classList.add('success');
				}
			}
		}, {
			key: 'isDiff',
			value: function isDiff(a, b) {
				if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
					return true;
				} else if (Array.isArray(a)) {
					return a.length !== b.length || a.some(function (v, i) {
						return v !== b[i];
					});
				} else if ((typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) === 'object') {
					if ((0, _keys2.default)(a).length !== (0, _keys2.default)(b).length) return true;
					for (var i in a) {
						if (a[i] !== b[i]) return true;
					}
					return false;
				}
				return a !== b;
			}
		}, {
			key: 'cloneObj',
			value: function cloneObj(obj) {
				var newObj = {};
				for (var key in obj) {
					newObj[key] = obj[key];
				}
				return newObj;
			}
		}]);
		return Detector;
	}();
	
	exports.default = Detector;

/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _from = __webpack_require__(70);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _assign = __webpack_require__(58);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(11);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(17);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Detector = __webpack_require__(279);
	
	var _Detector2 = _interopRequireDefault(_Detector);
	
	var _Processor = __webpack_require__(281);
	
	var _Processor2 = _interopRequireDefault(_Processor);
	
	var _missions = __webpack_require__(282);
	
	var _missions2 = _interopRequireDefault(_missions);
	
	__webpack_require__(671);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _default = {
		size: null,
		inService: false,
		missions: _missions2.default,
		mission: 1,
		test_count: 2,
		data_count: 20,
		cols: 3,
		rows: 3,
		processor_count: 9,
		speed: 5
	};
	
	var Factory = function () {
		function Factory(el, options) {
			(0, _classCallCheck3.default)(this, Factory);
	
			(0, _assign2.default)(this, _default, options);
			this.elem = el;
			this.data = [];
			this.events = [];
			this.detector = null;
			this.active = 0;
			this.test_active = 0;
			this.init();
		}
	
		(0, _createClass3.default)(Factory, [{
			key: 'init',
			value: function init() {
				this.initSize();
				this.getMissions();
				this.initMission();
				this.createContaner();
				this.createConsole();
				this.initProcessor();
				this.createDetector();
				this.createPanel();
			}
		}, {
			key: 'destory',
			value: function destory() {
				this.elem.innerHTML = '';
				this.data = [];
				this.events = [];
				this.active = 0;
				this.test_active = 0;
				this.inService = false;
				this.detector = null;
				while (this.events.length) {
					this.events.shift()();
				}
			}
		}, {
			key: 'initSize',
			value: function initSize() {
				if (this.size) {
					this.width = this.size[0];
					this.height = this.size[1];
					this.elem.style.cssText = '\n\t\t\t\twidth: ' + this.width + 'px;\n\t\t\t\theight: ' + this.height + 'px;\n\t\t\t';
				} else {
					this.width = this.elem.offsetWidth;
					this.height = this.elem.offsetHeight;
				}
			}
		}, {
			key: 'createDetector',
			value: function createDetector() {
				this.detector = new _Detector2.default({
					wrap: this.console,
					isMultigroup: this.isMultigroup || false,
					factory: this,
					data: this.data
				});
			}
		}, {
			key: 'createPanel',
			value: function createPanel() {
				this.panel = document.createElement('DIV');
				this.panel.className = 'factory-panel';
	
				this.btnGroup = document.createElement('DIV');
				this.btnGroup.className = 'factory-btn-group';
				this.nextBtn = this.createBtn('Next', this.next, this.btnGroup);
				this.autoBtn = this.createBtn('Auto', this.auto, this.btnGroup);
				this.resetBtn = this.createBtn('Reset', this.reset, this.btnGroup);
				this.restartBtn = this.createBtn('Restart', this.restart, this.btnGroup);
	
				this.msgGroup = document.createElement('DIV');
				this.msgGroup.className = 'factory-msg-group';
				this.msgGroup.textContent = 'Code Mode';
	
				this.speedGroup = document.createElement('DIV');
				this.speedGroup.className = 'factory-speed-group';
				this.slowBtn = this.createBtn('Slow', this.slow, this.speedGroup);
				this.speedDisplay = document.createElement('DIV');
				this.speedDisplay.className = 'factory-speed';
				this.setSpeed(this.speed);
				this.speedGroup.appendChild(this.speedDisplay);
				this.fastBtn = this.createBtn('Fast', this.fast, this.speedGroup);
	
				this.panel.appendChild(this.speedGroup);
				this.panel.appendChild(this.btnGroup);
				this.panel.appendChild(this.msgGroup);
				this.console.appendChild(this.panel);
			}
		}, {
			key: 'setSpeed',
			value: function setSpeed(speed) {
				this.speed = speed;
				this.interval = 330 - this.speed * 30;
				this.speedDisplay.textContent = 'Speed: ' + this.speed;
				this.resetTimer();
			}
		}, {
			key: 'fast',
			value: function fast() {
				if (this.fastBtn.classList.contains('disabled')) return false;
				this.speed === 1 && this.slowBtn.classList.remove('disabled');
				this.setSpeed(this.speed + 1);
				this.speed === 10 && this.fastBtn.classList.add('disabled');
			}
		}, {
			key: 'slow',
			value: function slow() {
				if (this.slowBtn.classList.contains('disabled')) return false;
				this.speed === 10 && this.fastBtn.classList.remove('disabled');
				this.setSpeed(this.speed - 1);
				this.speed === 1 && this.slowBtn.classList.add('disabled');
			}
		}, {
			key: 'createBtn',
			value: function createBtn(name, fn, wrap) {
				var btn = document.createElement('BUTTON');
				btn.className = 'factory-panel-btn';
				btn.textContent = name;
				fn = fn.bind(this);
				btn.addEventListener('click', fn, false);
				this.events.push(function () {
					return btn.removeEventListener('click', fn, false);
				});
				wrap.appendChild(btn);
				return btn;
			}
		}, {
			key: 'createContaner',
			value: function createContaner() {
				this.container = document.createElement('DIV');
				this.container.className = 'factory-container';
				this.elem.appendChild(this.container);
			}
		}, {
			key: 'createConsole',
			value: function createConsole() {
				this.console = document.createElement('DIV');
				this.console.className = 'factory-console';
				this.elem.appendChild(this.console);
			}
		}, {
			key: 'getMissions',
			value: function getMissions() {
				var fn = this.missions[this.mission];
				if (typeof fn !== 'function') {
					alert('你已全部通关（撒花');
				} else {
					(0, _assign2.default)(this, this.missions[this.mission]());
					this.processor_count = this.cols * this.rows;
				}
			}
		}, {
			key: 'initMission',
			value: function initMission() {
				this.intro && this.elem.setAttribute('data-intro', this.intro);
				this.elem.offsetWidth;
				for (var i = 0; i < this.data_count; i++) {
					var d = this.missionCreater();
					this.data.push({
						input: d.input,
						output: null,
						expectant_output: d.output,
						result: 'pending'
					});
				}
			}
		}, {
			key: 'initProcessor',
			value: function initProcessor() {
				var _this = this;
	
				this.processors = [];
				for (var i = 0; i < this.processor_count; i++) {
					this.processors.push(new _Processor2.default({
						width: 100 / this.cols - 3 + '%',
						height: 100 / this.rows - 3 + '%',
						status: this.err && this.err.indexOf(i) > -1 ? 'error' : 'idle',
						size: this.size,
						wrap: this.container,
						factory: this,
						index: i
					}));
				}
				(0, _from2.default)(this.processors, function (processor, i) {
					var leftIndex = i - 1;
					processor.leftProcessor = i % _this.cols ? _this.processors[leftIndex] || null : null;
					var rightIndex = i + 1;
					processor.rightProcessor = rightIndex % _this.cols ? _this.processors[rightIndex] || null : null;
					var TopIndex = i - _this.cols;
					processor.topProcessor = _this.processors[TopIndex] || null;
					var BottomIndex = i + _this.cols;
					processor.bottomProcessor = _this.processors[BottomIndex] || null;
	
					if (_this.entry[i]) {
						processor.setPort(_this.entry[i], 'entry');
					}
					if (_this.export[i]) {
						processor.setPort(_this.export[i], 'export');
					}
				});
			}
		}, {
			key: 'unableCodeInput',
			value: function unableCodeInput(bool) {
				(0, _from2.default)(this.processors, function (processor) {
					bool ? processor.code.setAttribute('disabled', true) : processor.code.removeAttribute('disabled');
				});
			}
		}, {
			key: 'auto',
			value: function auto() {
				var _this2 = this;
	
				if (this.timer) return this.pause();
	
				this.autoBtn.textContent = 'pause';
				this.autoBtn.classList.add('active');
				this.timer = setInterval(function () {
					_this2.next();
				}, this.interval);
			}
		}, {
			key: 'resetTimer',
			value: function resetTimer() {
				var _this3 = this;
	
				if (!this.timer) {
					return false;
				}
				this.next();
				clearInterval(this.timer);
				this.timer = null;
				this.timer = setInterval(function () {
					_this3.next();
				}, this.interval);
			}
		}, {
			key: 'pause',
			value: function pause() {
				this.autoBtn.textContent = 'Auto';
				this.autoBtn.classList.remove('active');
				clearInterval(this.timer);
				this.timer = null;
			}
		}, {
			key: 'end',
			value: function end() {
				if (this.detector.success_count === this.data.length) {
					if (this.test_active === this.test_count) {
						this.pause();
						this.msgGroup.textContent = '你通关了, 点GO进入下一关:)';
						if (!this.nextMissionBtn) {
							this.nextMissionBtn = this.createBtn('Go', this.nextMission, this.btnGroup);
						}
					} else {
						this.console.removeChild(this.detector.elem);
						this.detector = null;
						this.createDetector();
						this.test_active++;
						this.active = 0;
						this.detector.success_count = 0;
						this.msgGroup.textContent = 'Running Mode\uFF1A\u5DF2\u901A\u8FC7\u6D4B\u8BD5\uFF08' + this.test_active + '/' + (this.test_count + 1) + '\uFF09';
						(0, _from2.default)(this.processors, function (processor) {
							return processor.setCom(null);
						});
					}
				} else {
					this.pause();
					this.msgGroup.textContent = '\u51FA\u9519\u4E86' + (this.data.length - this.detector.success_count) + '\u4E2A, \u70B9\u51FBReset\u518D\u6539\u6539';
				}
			}
		}, {
			key: 'nextMission',
			value: function nextMission() {
				this.mission = this.mission + 1;
				this.restart();
				this.nextMissionBtn = null;
			}
		}, {
			key: 'restart',
			value: function restart() {
				this.msgGroup.textContent = 'Code Mode';
				this.pause();
				this.destory();
				this.init();
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.active = 0;
				this.test_active = 0;
				this.inService = false;
				this.unableCodeInput(false);
				this.detector.reset();
				this.msgGroup.textContent = 'Code Mode';
				(0, _from2.default)(this.processors, function (processor) {
					processor._NEXT = null;
					processor.setCom(null);
					processor.resetACC();
				});
			}
		}, {
			key: 'next',
			value: function next() {
				if (this.active < this.data.length) {
					this.detector.setInputActive(this.active);
					this.entryGetNext();
					if (!this.inService) {
						this.inService = true;
						this.msgGroup.textContent = 'Running Mode';
						this.unableCodeInput(true);
					}
					this.active++;
				} else {
					this.detector.setInputActive();
				}
	
				(0, _from2.default)(this.processors, function (processor) {
					processor.resetACC();
				});
	
				this.entryGetNext();
	
				(0, _from2.default)(this.processors, function (processor) {
					processor.next();
				});
	
				!this.processors.some(function (processor) {
					return processor.status === 'run';
				}) && this.end();
			}
		}, {
			key: 'entryGetNext',
			value: function entryGetNext() {
				for (var key in this.entry) {
					this.data[this.active] && this.processors[key].setNext(this.data[this.active].input);
				}
			}
		}]);
		return Factory;
	}();
	
	exports.default = Factory;

/***/ },

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(163);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _assign = __webpack_require__(58);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(11);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(17);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _default = {
		width: '30%',
		height: '30%',
		_NEXT: null,
		_ACC: null,
		_COM: null,
		_context: {},
		cur_size: 0,
		size: 128,
		status: 'idle' };
	
	var Processor = function () {
		function Processor(options) {
			(0, _classCallCheck3.default)(this, Processor);
	
			(0, _assign2.default)(this, _default, options);
			this.asyncSize = this.asyncSize.bind(this);
			this.closeError = this.closeError.bind(this);
			this.init();
		}
	
		(0, _createClass3.default)(Processor, [{
			key: 'bindEvent',
			value: function bindEvent() {
				this.code.addEventListener('keyup', this.asyncSize);
				this.elem.addEventListener('click', this.closeError);
			}
		}, {
			key: 'unbindEvent',
			value: function unbindEvent() {
				this.code.removeEventListener('keyup', this.asyncSize);
				this.elem.removeEventListener('click', this.closeError);
			}
		}, {
			key: 'init',
			value: function init() {
				this.createProcessor();
				this.bindEvent();
			}
		}, {
			key: 'destory',
			value: function destory() {
				this.unbindEvent();
			}
		}, {
			key: 'createProcessor',
			value: function createProcessor() {
				this.elem = document.createElement('DIV');
				this.elem.className = 'factory-process';
				this.elem.style.cssText = '\n\t\twidth: ' + this.width + ';\n\t\theight: ' + this.height + ';\n\t\t';
				this.status === 'error' && this.setError();
				this.code = this.createCode();
				this.displayArea = this.createDisplayArea();
				this.wrap.appendChild(this.elem);
			}
		}, {
			key: 'setError',
			value: function setError() {
				this.elem.classList.add('factory-error');
				this.elem.setAttribute('data-error', 'ERROR');
			}
		}, {
			key: 'setCodeError',
			value: function setCodeError(err) {
				this.elem.classList.add('factory-code-error');
				this.elem.setAttribute('data-error', err);
				this.factory.pause();
			}
		}, {
			key: 'closeError',
			value: function closeError() {
				if (this.elem.classList.contains('factory-code-error')) {
					this.elem.classList.remove('factory-code-error');
				}
			}
		}, {
			key: 'createCode',
			value: function createCode() {
				var elem = document.createElement('DIV');
				elem.className = 'code-group';
				elem.innerHTML = '<div class="code-index">Processor ' + (this.index + 1) + '</div>';
	
				var textarea = document.createElement('TEXTAREA');
				textarea.className = 'code';
				textarea.setAttribute('spellcheck', false);
				elem.appendChild(textarea);
				this.elem.appendChild(elem);
				return textarea;
			}
		}, {
			key: 'createDisplayArea',
			value: function createDisplayArea() {
				var elem = document.createElement('DIV');
				elem.className = 'display-area';
				this.displayNEXT = this.createItem('NEXT', this._NEXT, elem);
				this.displayACC = this.createItem('ACC', this._ACC, elem);
				this.displayCOM = this.createItem('COM', this._COM, elem);
				this.displayStatus = this.createItem('STATUS', this.status, elem);
				this.displaySize = this.createItem('BYTE', this.cur_size + '/' + this.size, elem);
				this.elem.appendChild(elem);
				return elem;
			}
		}, {
			key: 'createItem',
			value: function createItem(name, value, wrap) {
				var elem = document.createElement('DIV');
				elem.className = 'display-item';
				elem.innerHTML = '<div class="item-title">' + name + '</div>';
	
				var value_elem = document.createElement('DIV');
				value_elem.className = 'item-value';
				value_elem.textContent = value;
				elem.appendChild(value_elem);
				wrap.appendChild(elem);
				return value_elem;
			}
		}, {
			key: 'asyncSize',
			value: function asyncSize(e) {
				var formatted_val = e.target.value.match(/\S/g);
				this.cur_size = formatted_val ? formatted_val.length : 0;
				if (this.cur_size > this.size) {
					this.cur_size = this.size;
					e.target.value = e.target.value.substr(0, this.size);
				}
				this.displaySize.innerHTML = this.cur_size + '/' + this.size;
			}
		}, {
			key: 'transmitACC',
			value: function transmitACC(val, key) {
				if (this[key].type === 'entry') {
					return false;
				} else if (this[key].type === 'export') {
					val !== null && this.factory.detector.output(val, this[key].name);
				} else {
					this[key].setNext(val);
				}
			}
		}, {
			key: 'setCom',
			value: function setCom(val) {
				this._COM = val;
				this.displayCOM.innerHTML = this._COM !== null ? (0, _stringify2.default)(this._COM) : '';
			}
		}, {
			key: 'setStatus',
			value: function setStatus(val) {
				this.status = val;
				this.displayStatus.innerHTML = this.status;
			}
		}, {
			key: 'setNext',
			value: function setNext(val) {
				if (this.status === 'error') return;
	
				this._NEXT = val;
				this.displayNEXT.innerHTML = this._NEXT !== null ? (0, _stringify2.default)(this._NEXT) : '';
			}
		}, {
			key: 'next',
			value: function next() {
				if (this.status === 'error') return false;
	
				this.isEnd();
				this._ACC !== null && this.executeCode();
			}
		}, {
			key: 'resetACC',
			value: function resetACC() {
				this._ACC = this._NEXT;
				this.displayACC.textContent = this._ACC !== null ? (0, _stringify2.default)(this._ACC) : '';
				this.setNext(null);
			}
		}, {
			key: 'isEnd',
			value: function isEnd() {
				if (this._ACC === null && this._NEXT === null) {
					this.setStatus('idle');
				} else {
					this.setStatus('run');
				}
			}
		}, {
			key: 'executeCode',
			value: function executeCode() {
				var _this = this;
	
				var code = this.code.value;
				var fn = function fn(_ref) {
					var NEXT = _ref.NEXT,
					    ACC = _ref.ACC,
					    COM = _ref.COM,
					    L = _ref.L,
					    R = _ref.R,
					    T = _ref.T,
					    B = _ref.B,
					    C = _ref.C,
					    __ERROR__ = _ref.__ERROR__;
	
					if (false) {
						try {
							eval(code);
						} catch (err) {
							console.error(err);
							__ERROR__(err);
						}
					} else {
						eval(code);
					}
				};
				this._context = {};
				fn.call(this._context, {
					NEXT: this._NEXT,
					ACC: this._ACC,
					COM: this._COM,
					L: function L() {
						var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._ACC;
						return _this.leftProcessor && _this.transmitACC(val, 'leftProcessor');
					},
					R: function R() {
						var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._ACC;
						return _this.rightProcessor && _this.transmitACC(val, 'rightProcessor');
					},
					T: function T() {
						var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._ACC;
						return _this.topProcessor && _this.transmitACC(val, 'topProcessor');
					},
					B: function B() {
						var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._ACC;
						return _this.bottomProcessor && _this.transmitACC(val, 'bottomProcessor');
					},
					C: function C() {
						var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
						return _this.setCom(val);
					},
					__ERROR__: function __ERROR__(err) {
						return _this.setCodeError(err);
					}
				});
			}
		}, {
			key: 'setPort',
			value: function setPort(obj, type) {
				this[obj.pos] = {
					type: type,
					name: obj.name
				};
				this.elem.setAttribute('data-port', (type === 'entry' ? 'INPUT' : 'OUTPUT') + ' ' + (obj.name || '') + ' \u2193');
				this.elem.classList.add(type);
			}
		}]);
		return Processor;
	}();
	
	exports.default = Processor;

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _from = __webpack_require__(70);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		'1': function _() {
			var missionCreater = function missionCreater() {
				var createMandom = function createMandom() {
					return ~~(Math.random() * 10);
				};
				var input = createMandom();
				return {
					input: input,
					output: input * 2
				};
			};
			return {
				intro: 'Mission 1：简单的乘法',
				err: [3, 4],
				cols: 3,
				rows: 3,
				size: 64,
				entry: {
					'0': {
						pos: 'topProcessor'
					}
				},
				export: {
					'6': {
						pos: 'bottomProcessor'
					}
				},
				missionCreater: missionCreater
			};
		},
		'2': function _() {
			var missionCreater = function missionCreater() {
				var createMandom = function createMandom() {
					return ~~(Math.random() * 10);
				};
				var input = [createMandom(), createMandom(), createMandom()];
				var output = (0, _from2.default)(input.slice().sort(function (a, b) {
					return a - b;
				}), function (num, i) {
					return num - i;
				});
				return {
					input: input,
					output: output.reduce(function (a, b) {
						return a * b;
					})
				};
			};
			return {
				intro: 'Mission 2：排序后减去索引，最后再相乘',
				err: [],
				size: 64,
				cols: 4,
				rows: 3,
				entry: {
					'0': {
						pos: 'topProcessor'
					}
				},
				export: {
					'11': {
						pos: 'bottomProcessor'
					}
				},
				missionCreater: missionCreater
			};
		},
		'3': function _() {
			var missionCreater = function missionCreater() {
				var createMandom = function createMandom() {
					return ~~(Math.random() * 3) - 1;
				};
				var input = createMandom();
				var output = input > 0 ? { 'A': 1, 'B': 0, 'C': 0 } : input === 0 ? { 'A': 0, 'B': 1, 'C': 0 } : { 'A': 0, 'B': 0, 'C': 1 };
				return {
					input: input,
					output: output
				};
			};
			return {
				intro: 'Mission 3：分类',
				err: [],
				size: 32,
				cols: 3,
				rows: 3,
				isMultigroup: true,
				entry: {
					'1': {
						pos: 'topProcessor'
					}
				},
				export: {
					'6': {
						name: 'A',
						pos: 'bottomProcessor'
					},
					'7': {
						name: 'B',
						pos: 'bottomProcessor'
					},
					'8': {
						name: 'C',
						pos: 'bottomProcessor'
					}
				},
				missionCreater: missionCreater
			};
		},
		'4': function _() {
			var NextA = 0;
			var NextB = 0;
			var missionCreater = function missionCreater() {
				var createMandom = function createMandom() {
					return ~~(Math.random() * 10);
				};
				var input = createMandom();
				NextA += input;
				NextB = Math.abs(input - NextB);
				return {
					input: input,
					output: {
						A: NextA,
						B: NextB
					}
				};
			};
			return {
				intro: 'Mission 4：累加 and 差值的绝对值',
				err: [],
				size: 64,
				cols: 2,
				rows: 2,
				isMultigroup: true,
				entry: {
					'0': {
						pos: 'topProcessor'
					}
				},
				export: {
					'2': {
						name: 'A',
						pos: 'bottomProcessor'
					},
					'3': {
						name: 'B',
						pos: 'bottomProcessor'
					}
				},
				missionCreater: missionCreater
			};
		}
	};

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(32);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(11);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(17);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(22);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(18);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(675);
	
	var _reactRedux = __webpack_require__(91);
	
	var _redux = __webpack_require__(69);
	
	var _EventBusAction = __webpack_require__(267);
	
	var _EventBusAction2 = _interopRequireDefault(_EventBusAction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Home = function (_Component) {
		(0, _inherits3.default)(Home, _Component);
	
		function Home(props) {
			(0, _classCallCheck3.default)(this, Home);
			return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));
		}
	
		(0, _createClass3.default)(Home, [{
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ ref: 'view', className: 'home-view' },
					_react2.default.createElement(
						'section',
						{ className: 'info' },
						_react2.default.createElement(
							'h1',
							null,
							'NightCat'
						),
						_react2.default.createElement(
							'small',
							null,
							'- Welcome to NightCat game city -'
						)
					)
				);
			}
		}]);
		return Home;
	}(_react.Component);
	
	var mapStateToProps = function mapStateToProps(state) {
		return { store: state };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		return {
			actions: (0, _redux.bindActionCreators)(_EventBusAction2.default, dispatch)
		};
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);
	
	
	Home.propTypes = {
		actions: _react.PropTypes.any
	};

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(7)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },

/***/ 669:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(111);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(44)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(111, function() {
				var newContent = __webpack_require__(111);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 671:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(113);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(44)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(113, function() {
				var newContent = __webpack_require__(113);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 674:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(116);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(44)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(116, function() {
				var newContent = __webpack_require__(116);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 675:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(117);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(44)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(117, function() {
				var newContent = __webpack_require__(117);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 679:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/bg.c198192.jpg";

/***/ },

/***/ 681:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./factory/index.jsx": 278,
		"./home/index.jsx": 283
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 681;


/***/ }

});
//# sourceMappingURL=1.a9964.js.map