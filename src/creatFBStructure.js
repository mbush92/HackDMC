import firebase from 'firebase'
import _ from 'lodash'
let machineRef = new firebase('https://hackdmc.firebaseio.com/machines')

// machineRef.set(null)

let dataStructure = {
    46:{
    salesForceID:'xyz',
    currentState:'Red',
    alarmMsg:'HOFFMANN COOLER GENERAL MALFUNCTION',
    timeEnteredState: firebase.ServerValue.TIMESTAMP,
    machineID: '46'
  },
  47:{
  salesForceID:'xyz',
  currentState:'Red',
  alarmMsg:'HOFFMANN COOLER GENERAL MALFUNCTION',
  timeEnteredState: firebase.ServerValue.TIMESTAMP,
  machineID: '47'

}
}
 let caseStructure = [

       {caseID:'ABC',caseStatus:'new', machineID:47},
       {caseID:'mnq',caseStatus:'inProcess', machineID:47}
     ]


// machineRef.set(dataStructure)

_.forEach(caseStructure, (val)=>{
  console.log(val)
  machineRef.child('46/cases').push(val)
})
