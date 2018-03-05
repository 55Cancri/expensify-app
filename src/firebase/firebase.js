import * as firebase from 'firebase'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }

// database.ref('expenses').on('child_removed', snapshot => {
//   console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_changed', snapshot => {
//   console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_added', snapshot => {
//   console.log(snapshot.key, snapshot.val())
// })

// database
//   .ref('expenses')
//   .once('value')
//   .then(snapshot => {
//     const expenses = []

//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       })
//     })

//     console.log(expenses)
//   })

// database.ref('expenses').on(
//   'value',
//   snapshot => {
//     const expenses = []

//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       })
//     })

//   },
//   e => {
//     console.log(`error fetching data: ${e}`)
//   }
// )

// database.ref('expenses').push({
//   description: 'sour patch',
//   note: 'stop eating them so much',
//   amount: 159,
//   createdAt: 1242131312
// })

// database.ref('notes').set(notes)

// database.ref().on('value', snapshot => {
//   const val = snapshot.val()
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`)
// })

// const onValueChange = database.ref().on(
//   'value',
//   snapshot => {
//     console.log(snapshot.val())
//   },
//   e => {
//     console.log(`error fetching data: ${e}`)
//   }
// )

// setTimeout(() => {
//   database.ref('age').set(28)
// }, 3500)

// setTimeout(() => {
//   database.ref().off(onValueChange)
// }, 6500)

// setTimeout(() => {
//   database.ref('age').set(30)
// }, 9500)

// database
//   .ref()
//   .set({
//     name: 'Eric Morrison',
//     age: 23,
//     stressLevel: 6,
//     job: {
//       title: 'software developer',
//       company: 'google'
//     },
//     location: {
//       city: 'Philadelphia',
//       country: 'United States'
//     }
//   })
//   .then(() => console.log('data saved'))
//   .catch(e => console.log(`failed: ${e}`))

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'amazon',
//   'location/city': 'seattle'
// })
