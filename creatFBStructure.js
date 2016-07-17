'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var machineRef = new _firebase2.default('https://hackdmc.firebaseio.com/machines');

// machineRef.set(null)

var dataStructure = {
  46: {
    salesForceID: 'xyz',
    currentState: 'Red',
    alarmMsg: 'HOFFMANN COOLER GENERAL MALFUNCTION',
    timeEnteredState: _firebase2.default.ServerValue.TIMESTAMP,
    machineID: '46'
  },
  47: {
    salesForceID: 'xyz',
    currentState: 'Red',
    alarmMsg: 'HOFFMANN COOLER GENERAL MALFUNCTION',
    timeEnteredState: _firebase2.default.ServerValue.TIMESTAMP,
    machineID: '47'

  }
};
var caseStructure = [{ caseID: 'ABC', caseStatus: 'new', machineID: 47 }, { caseID: 'mnq', caseStatus: 'inProcess', machineID: 47 }];

// machineRef.set(dataStructure)

_lodash2.default.forEach(caseStructure, function (val) {
  console.log(val);
  machineRef.child('46/cases').push(val);
});