'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataRef = new _firebase2.default('https://hackdmc.firebaseio.com/data');

dataRef.set(null);