import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';



export class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  async login() {
    const { email, password } = this.state
    const res = await axios.post(`/auth/login`, { email, password })
    if (res.data.loggedIn) this.props.history.push('/')
    else alert(res.data.message)
    console.log(res.data.message)
  }


  render() {
    return (
      <div>
        <div>
          <h1>Login</h1>
          <span>Email</span>
          <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type='text'></input>
          <span>Password</span>
          <input onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type='password'></input>
          <button onClick={() => this.login()}>Login</button>
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
