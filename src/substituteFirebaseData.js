import firebase from 'firebase'
import _ from 'lodash'
let machineRef = new firebase('https://hackdmc.firebaseio.com/machines')
let getDataRef = new firebase('https://hackdmc.firebaseio.com/test')

getDataRef.on('value', (data) => {
  let newData = data.val()
  console.log(newData)
  let key = _.keys(newData)
  _.forEach(key,(v)=>{
    machineRef.child(v).once('value', (dataSnapshot)=>{
      console.log(dataSnapshot.val())
      let newObject = dataSnapshot.val()
      console.log('NewObject:', newObject)
      machineRef.update(newData)
      console.log(newObject.cases)
      if (newObject.cases){
        machineRef.child(v).update({cases:newObject.cases})
      }
    })
  })
})
