'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dataRef = new _firebase2.default('https://hackdmc.firebaseio.com/data');
var myRef = new _firebase2.default('https://hackdmc.firebaseio.com/myKeys');
var keys = {};
var values = {};
var level = [];


dataRef.limitToFirst(1000).on('value', function (data) {
  // console.log(data.val())
  _lodash2.default.forEach(data.val(), function (value, key) {
    //  console.log(value)
    _lodash2.default.forEach(value, function (v, k) {
      var _extends2;

      // console.log(value.machine_id)
      keys = _extends({}, keys, (_extends2 = {}, _defineProperty(_extends2, k, k), _defineProperty(_extends2, value.machine_id, value.machine_id), _defineProperty(_extends2, value.mt_value, value.mt_value), _extends2));
      if (value.subtype == 'alarm') {

        values = _extends({}, values, _defineProperty({}, value.mt_value, value.mt_value));
      }
      // console.log(keys)
    });
  });
  console.log(keys);
  var valueArr = _lodash2.default.keys(values);
  _fs2.default.writeFile('alarms.log', JSON.stringify(valueArr), function (err) {
    console.log(data.numChildren());
  });
  //myRef.set(keys)
});