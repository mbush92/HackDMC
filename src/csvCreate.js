const readline = require('readline');
const fs = require('fs');
import _ from 'lodash'
let i = 0
let keys = {}
let alarms = {}
let machines = {}
let alarmTypes = {}
const fileName = process.argv[2]
const qtyToProcess = Number(process.argv[3])
console.log('Processing', qtyToProcess, ' lines from',fileName)
// console.log(typeof(qtyToProcess))
import ProgressBar from 'progress'
var bar = new ProgressBar('  reading [:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: qtyToProcess
});

let keyArr = [ 'alarm_name',
'virtual_flag',
'alarm_condition',
'subtype',
'mt_value',
'begin_dt_tm',
'machine_id',
'type',
'mt_name',
'component',
'alarm_code',
'reason',
'instance_id',
'alarm_type',
'alarm_severity',
'department',
'alarm_nativeCode',
'dataitemid',
'sequence',
'category' ]
let lineToWrite
let rl

for (var j=0, len = keyArr.length; j<len;j++){
  if (j==0) {
    lineToWrite = keyArr[j]
  } else {
    lineToWrite = lineToWrite + ', ' + keyArr[j]
  }
}
fs.appendFile('data.csv',lineToWrite +'\n', (err) => {
  if (err) throw err;
  //console.log('success')
  rl = readline.createInterface({input: fs.createReadStream(fileName)});




let jsonLine
let dataToWrite
rl.on('line', (line) => {
  let wroteFirst = false
  i=0
  jsonLine = JSON.parse(line)
  lineToWrite = ''
  for (var i = 0, len = keyArr.length; i < len; i++) {
    // console.log(typeof(v))
    let v = keyArr[i]
    //console.log(v)

      if (jsonLine[v] != undefined && jsonLine[v] != null && jsonLine[v] != ''){
        dataToWrite = String(jsonLine[v]).replace(/[,]/g, '')
        if (v == 'begin_dt_tm') {
          dataToWrite = new Date(dataToWrite*1000).toJSON();
        }
        if (wroteFirst == false){
          wroteFirst = true
          lineToWrite =  dataToWrite
        } else {
          lineToWrite = lineToWrite + ', ' + dataToWrite
        }
      } else {
        if (wroteFirst == false){
          wroteFirst = true
        } else if (i < (len - 1)){
          lineToWrite =  lineToWrite + ', '
        }
      }
    }

    // console.log(lineToWrite)
    fs.appendFile('data.csv',lineToWrite +'\n', (err) => {
      if (err) throw err;
      //console.log('success')
    })

  bar.tick()
  if (bar.complete) {
    console.log("Analyzed", bar.curr, "records")
    process.exit()
    setTimeout(function(){
      process.exit()}, 0)
  }

});

rl.on('close', ()=>{

  // console.log(keys)
  // console.log(machines)
  console.log(alarms)
  // console.log(alarmTypes)
  console.log("Analyzed", bar.curr, "records")
  process.exit()
})
})
process.on('SIGINT', function(){
  console.log("")

  // console.log(keys)
  // console.log(machines)
  console.log(alarms)
  // console.log(alarmTypes)
  console.log("Analyzed", bar.curr, "records")
  process.exit()
})
