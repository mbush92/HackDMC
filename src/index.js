import firebase from 'firebase'
import _ from 'lodash'
let dataRef = new firebase('https://hackdmc.firebaseio.com/data')
let myRef = new firebase('https://hackdmc.firebaseio.com/myKeys')
let keys = {}
let values = {}
let level = []
import fs from 'fs'

dataRef.limitToFirst(1000).on('value', (data)=>{
  // console.log(data.val())
  _.forEach(data.val(), (value, key)=>{
    //  console.log(value)
    _.forEach(value, (v, k)=>{
      // console.log(value.machine_id)
      keys = {...keys, [k]:k, [value.machine_id]:value.machine_id, [value.mt_value]:value.mt_value}
      if (value.subtype == 'alarm') {

        values = {...values, [value.mt_value]:value.mt_value}
      }
      // console.log(keys)
    })
  })
  console.log(keys)
  let valueArr = _.keys(values)
  fs.writeFile('alarms.log', JSON.stringify(valueArr), (err)=>{
    console.log(data.numChildren())
  })
  //myRef.set(keys)
})
