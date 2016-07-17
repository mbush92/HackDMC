'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var machineRef = new _firebase2.default('https://hackdmc.firebaseio.com/machines');
var getDataRef = new _firebase2.default('https://hackdmc.firebaseio.com/test');

getDataRef.on('value', function (data) {
  var newData = data.val();
  console.log(newData);
  var key = _lodash2.default.keys(newData);
  _lodash2.default.forEach(key, function (v) {
    machineRef.child(v).once('value', function (dataSnapshot) {
      console.log(dataSnapshot.val());
      var newObject = dataSnapshot.val();
      console.log('NewObject:', newObject);
      machineRef.update(newData);
      console.log(newObject.cases);
      if (newObject.cases) {
        machineRef.child(v).update({ cases: newObject.cases });
      }
    });
  });
});