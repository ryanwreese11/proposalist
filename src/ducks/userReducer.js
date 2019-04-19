import axios from 'axios'

const initialState = {
  user: {},
  customers: []
}


const GET_DATA = 'GET_DATA'
const GET_CUSTOMERS = 'GET_CUSTOMERS'

export function getData() {
  let data = axios.get('/auth/user-data').then(res => res.data)
  return {
    type: GET_DATA,
    payload: data
  }
}

export function getCustomers() {
  let data =  axios.get('/api/customers').then(res => res.data)
    console.log(1111)
    console.log(234234,data)
    return {
      type: GET_CUSTOMERS,
      payload: data
    }
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA + '_FULFILLED':
      return { user: action.payload }
      case GET_CUSTOMERS + '_FULFILLED':
      console.log(action.payload)
      return {...state, customers: action.payload}
    default:
      return state;
  }
}