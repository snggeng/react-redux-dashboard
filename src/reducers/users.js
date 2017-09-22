// import auth, { saveUser, logout } from 'helpers/auth'
// import { formatUserInfo } from 'helpers/utils'
// import { fetchUser } from 'helpers/api'
// import { ref, firebaseAuth } from '../config/constants'
// import * as userActions from '../actions/userActions'
import {AUTH_USER,UNAUTH_USER,FETCHING_USER,FETCHING_USER_FAILURE,
FETCHING_USER_SUCCESS,REMOVE_FETCHING_USER } from '../actions/userActions'

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

// userReducer
const user = (state = initialUserState, action) => {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}


/* REDUCER */
export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
        isFetching: false,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING_USER :
      return {
        ...state,
        isFetching: false,
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          error: '',
          [action.uid]: user(state[action.uid], action),
        }
    default :
      return state
  }
}
