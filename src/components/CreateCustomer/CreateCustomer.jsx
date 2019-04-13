import React, { Component } from 'react'

import {Link} from 'react-router-dom'

export class CreateCustomer extends Component {
  render() {
    return (
      <div>
        <span>Name</span>
        <input type='text'></input>
        <span>Email</span>
        <input type='text'></input>
        <span>Address</span>
        <input type='text'></input>
        <span>Utility</span>
        <input type='text'></input>
        <span>Notes</span>
        <input type='text'></input>
        <Link to='/customer'>
          <button>Create Customer</button>
        </Link>
        
      </div>
    )
  }
}

export default CreateCustomer
