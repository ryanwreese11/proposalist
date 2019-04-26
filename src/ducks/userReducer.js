import axios from 'axios'


const initialState = {
  user: {},
}


const GET_DATA = 'GET_DATA'
const KILL_USER = 'KILL_USER'


export function getData() {
  let data = axios.get(`/auth/user-data`).then(res => res.data)
  return {
    type: GET_DATA,
    payload: data
  }
}

export function killUser() {
  let data = axios.get('/logout')
  return {
    type: KILL_USER,
    payload: data
  }
}






export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA + '_FULFILLED':
      return { user: action.payload }
      case KILL_USER + '_FULFILLED':
      return {user: action.payload}
    default:
      return state;
  }
}