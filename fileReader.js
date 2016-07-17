'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var readline = require('readline');
var fs = require('fs');

var i = 0;
var keys = {};
var alarms = {};
var machines = {};
var alarmTypes = {};

var bar = new _progress2.default('  reading [:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: 100000
});

var rl = readline.createInterface({
  input: fs.createReadStream('itamcojson2016.json')
});
var jsonLine = void 0;
rl.on('line', function (line) {
  jsonLine = JSON.parse(line);
  _lodash2.default.forEach(jsonLine, function (val, key) {
    // console.log(val)
    keys = _extends({}, keys, _defineProperty({}, key, null));
  });
  // machines = {...machines, [jsonLine.machine_id]:jsonLine.machine_id}
  if (jsonLine.category == 'Alarm') {
    alarms = _extends({}, alarms, _defineProperty({}, jsonLine.alarm_severity + "& " + jsonLine.mt_value + '& ' + jsonLine.machine_id + '&' + jsonLine.type + '&', null));
    alarmTypes = _extends({}, alarmTypes, _defineProperty({}, jsonLine.alarm_condition, null));
  }
  // })
  bar.tick();
  if (bar.complete) {
    console.log("Analyzed", bar.curr, "records");
    // console.log(_.keys(keys))
    // console.log(machines)
    console.log(alarms);
    // console.log(alarmTypes)
    process.exit();
  }

  //   if (++i == 100000) {
  //     console.log("Analyzed", i, "records")
  //     console.log(keys)
  //     console.log(machines)
  //     console.log(alarms)
  //     console.log(alarmTypes)
  //     process.exit()
  //   }
});

rl.on('close', function () {

  // console.log(keys)
  // console.log(machines)
  console.log(alarms);
  // console.log(alarmTypes)
  console.log("Analyzed", bar.curr, "records");
  process.exit();
});

process.on('SIGINT', function () {
  console.log("");

  // console.log(keys)
  // console.log(machines)
  console.log(alarms);
  // console.log(alarmTypes)
  console.log("Analyzed", bar.curr, "records");
  process.exit();
});