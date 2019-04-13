import React, { Component } from 'react'

import {Link} from 'react-router-dom'

export class Register extends Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
        <span>First Name</span>
        <input type='text'></input>
        <span>Last Name</span>
        <input type='text'></input>
        <span>Email</span>
        <input type='text'></input>
        <span>Password</span>
        <input type='text'></input>
        <Link to='/'>
          <button>Create User</button>
        </Link>
      </div>
    )
  }
}

export default Register
