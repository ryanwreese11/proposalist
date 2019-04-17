import React, { Component } from 'react'
import axios from 'axios'


export class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isAdmin: false,
      isRep: false
    }

  }

  async register() {
    const { firstName, lastName, email, password, isAdmin, isRep } = this.state
    const res = await axios.post('/auth/register', { firstName, lastName, email, password, isAdmin, isRep })
    if (res.data.loggedIn) this.props.history.push('/')
    else alert(res.data.message)
  }



  render() {
    return (
      <div>
        <h1>Register</h1>
        <span>First Name</span>
        <input onChange={(e) => this.setState({ firstName: e.target.value })} value={this.state.firstName} type='text'></input>
        <span>Last Name</span>
        <input onChange={(e) => this.setState({ lastName: e.target.value })} value={this.state.lastName} type='text'></input>
        <span>Email</span>
        <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type='text'></input>
        <span>Password</span>
        <input onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type='text'></input>

        <button onClick={() => this.register()} >Create User</button>

      </div>
    )
  }
}

export default Register
