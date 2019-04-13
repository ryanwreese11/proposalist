import React, { Component } from 'react'

import { Link } from 'react-router-dom'

export class Login extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Login</h1>
          <span>Email</span>
          <input type='text'></input>
          <span>Password</span>
          <input type='text'></input>
          <Link to='/'>
            <button>Login</button>
          </Link>

        </div>
        <div>
          <span>Don't have an account? Register </span>
          <Link to='/register'>
            <span>Here</span>
          </Link>
        </div>
      </div>
    )
  }
}

export default Login
