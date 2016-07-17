'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readline = require('readline');
var fs = require('fs');

var i = 0;
var keys = {};
var alarms = {};
var machines = {};
var alarmTypes = {};
var fileName = process.argv[2];
var qtyToProcess = Number(process.argv[3]);
console.log('Processing', qtyToProcess, ' lines from', fileName);
// console.log(typeof(qtyToProcess))

var bar = new _progress2.default('  reading [:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: qtyToProcess
});

var keyArr = ['alarm_name', 'virtual_flag', 'alarm_condition', 'subtype', 'mt_value', 'begin_dt_tm', 'machine_id', 'type', 'mt_name', 'component', 'alarm_code', 'reason', 'instance_id', 'alarm_type', 'alarm_severity', 'department', 'alarm_nativeCode', 'dataitemid', 'sequence', 'category'];
var lineToWrite = void 0;
var rl = void 0;

for (var j = 0, len = keyArr.length; j < len; j++) {
  if (j == 0) {
    lineToWrite = keyArr[j];
  } else {
    lineToWrite = lineToWrite + ', ' + keyArr[j];
  }
}
fs.appendFile('data.csv', lineToWrite + '\n', function (err) {
  if (err) throw err;
  //console.log('success')
  rl = readline.createInterface({ input: fs.createReadStream(fileName) });

  var jsonLine = void 0;
  var dataToWrite = void 0;
  rl.on('line', function (line) {
    var wroteFirst = false;
    i = 0;
    jsonLine = JSON.parse(line);
    lineToWrite = '';
    for (var i = 0, len = keyArr.length; i < len; i++) {
      // console.log(typeof(v))
      var v = keyArr[i];
      //console.log(v)

      if (jsonLine[v] != undefined && jsonLine[v] != null && jsonLine[v] != '') {
        dataToWrite = String(jsonLine[v]).replace(/[,]/g, '');
        if (v == 'begin_dt_tm') {
          dataToWrite = new Date(dataToWrite * 1000).toJSON();
        }
        if (wroteFirst == false) {
          wroteFirst = true;
          lineToWrite = dataToWrite;
        } else {
          lineToWrite = lineToWrite + ', ' + dataToWrite;
        }
      } else {
        if (wroteFirst == false) {
          wroteFirst = true;
        } else if (i < len - 1) {
          lineToWrite = lineToWrite + ', ';
        }
      }
    }

    // console.log(lineToWrite)
    fs.appendFile('data.csv', lineToWrite + '\n', function (err) {
      if (err) throw err;
      //console.log('success')
    });

    bar.tick();
    if (bar.complete) {
      console.log("Analyzed", bar.curr, "records");
      process.exit();
      setTimeout(function () {
        process.exit();
      }, 0);
    }
  });

  rl.on('close', function () {

    // console.log(keys)
    // console.log(machines)
    console.log(alarms);
    // console.log(alarmTypes)
    console.log("Analyzed", bar.curr, "records");
    process.exit();
  });
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