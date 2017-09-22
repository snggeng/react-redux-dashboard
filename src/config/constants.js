import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID
}

// Initialize new firebase app
firebase.initializeApp(firebaseConfig)

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage()

// Create a storage reference from our storage service
export const storageRef = storage.ref()

// Create a child reference
export const imagesRef = storageRef.child('images')


export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const user = firebase.auth().currentUser
