import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = uid => ({
  type: 'LOGIN',
  uid
})

export const startLogin = () => {
  return () => {
    // this return is to return the promise chain
    // so others can latch on with .then()
    return firebase.auth().signInWithPopup(googleAuthProvider)
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut()
  }
}
