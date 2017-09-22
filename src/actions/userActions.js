import { ref, firebaseAuth } from '../config/constants'
import { push } from 'react-router-redux'

export const AUTH_USER = 'AUTH_USER'
export const UNAUTH_USER = 'UNAUTH_USER'
export const FETCHING_USER = 'FETCHING_USER'
export const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
export const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

// Authentication Helpers
const auth = (email, password) => {
  return firebaseAuth().signInWithEmailAndPassword(email, password).catch((error) => {
  // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    if (error) return { code: errorCode, message: errorMessage }
  })
}
const logout = () => {
  return firebaseAuth().signOut()
}

const saveUser = (user) => {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}

const formatUserInfo = (name, avatar, uid) => {
  return {
    name,
    avatar,
    uid,
  }
}

// Api Helper
const fetchUser = (uid) => {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}



//Action Creators
export const authUser = (uid) => {
  return {
    type: AUTH_USER,
    uid,
  }
}

export const unauthUser = () => {
  return {
    type: UNAUTH_USER,
  }
}

export const fetchingUser = () => {
  return {
    type: FETCHING_USER,
  }
}

export const fetchingUserFailure = (error) => {
  console.log(error)
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error: Wrong email or password.',
  }
}

export const fetchingUserSuccess = (uid, user, timestamp) => {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

export const fetchAndHandleAuthedUser = (user, email, password) => {
  return (dispatch) => {
    dispatch(fetchingUser())
    return auth(email, password)
    .then((user) => {
    // Set User profile
      if (user) {
        console.log(user)
        user.updateProfile({
          displayName: user.providerData[0].email.split('@')[0],
          photoURL: 'https://image.flaticon.com/icons/svg/236/236831.svg',
        }).then(() => {
          // Update successful.
          const userData = user.providerData[0]
          const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
          return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
        }, (error) => {
          // An error happened.
          if (error) return error
        })
        .then((user) => saveUser(user))
        .then((user) => dispatch(authUser(user.uid)))
        .then(() => dispatch(push('/admin')))
      }
    })
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export const logoutAndUnauth = () => {
  return (dispatch) => {
    logout()
    dispatch(unauthUser())
    dispatch(push('/login'))
  }
}

export const removeFetchingUser = () => {
  return {
    type: REMOVE_FETCHING_USER,
  }
}

export const fetchAndHandleUser = (uid) => {
  return (dispatch) => {
    dispatch(fetchingUser())

    return fetchUser(uid)
      .then((user) => dispatch(fetchingUserSuccess(uid, user, Date.now())))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}
