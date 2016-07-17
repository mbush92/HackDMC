const readline = require('readline');
const fs = require('fs');
import _ from 'lodash'
let i = 0
let keys = {}
let alarms = {}
let machines = {}
let alarmTypes = {}
import ProgressBar from 'progress'
var bar = new ProgressBar('  reading [:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: 100000
});

const rl = readline.createInterface({
  input: fs.createReadStream('itamcojson2016.json')
});
let jsonLine
rl.on('line', (line) => {
  jsonLine = JSON.parse(line)
  _.forEach(jsonLine, (val, key)=>{
    // console.log(val)
    keys = {...keys, [key]:null }
  })
  // machines = {...machines, [jsonLine.machine_id]:jsonLine.machine_id}
  if (jsonLine.category == 'Alarm'){
    alarms = {...alarms, [ jsonLine.alarm_severity + "& " + jsonLine.mt_value + '& ' + jsonLine.machine_id + '&' + jsonLine.type + '&']:null}
    alarmTypes = {...alarmTypes, [jsonLine.alarm_condition]:null }
  }
  // })
  bar.tick()
  if (bar.complete) {
    console.log("Analyzed", bar.curr, "records")
    // console.log(_.keys(keys))
    // console.log(machines)
    console.log(alarms)
    // console.log(alarmTypes)
    process.exit()
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

rl.on('close', ()=>{

  // console.log(keys)
  // console.log(machines)
  console.log(alarms)
  // console.log(alarmTypes)
  console.log("Analyzed", bar.curr, "records")
  process.exit()
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
