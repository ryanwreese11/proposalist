import React, { Component } from 'react'
import axios from 'axios'
import { getData } from './../../ducks/userReducer'
import { connect } from 'react-redux'
import User from './../User/User'




export class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isAdmin: false,
      isRep: false,
      edit: false,
      accounts: []
    }

  }
  componentDidMount() {
    this.props.getData()
    this.getUsers()
  }

  async register() {
    const { firstName, lastName, email, password, isAdmin, isRep } = this.state
    const res = await axios.post(`/auth/register`, { firstName, lastName, email, password, isAdmin, isRep })
    if (res.data.loggedIn) this.props.history.push('/')
    else alert(res.data.message)
  }

  async createUser() {
    const { firstName, lastName, email, password, isAdmin, isRep } = this.state
    await axios.post(`/api/users`, { firstName, lastName, email, password, isAdmin, isRep }).then(this.setState({ edit: false }))

  }

  

  handleNewClick = () => {
    this.setState({
      edit: true
    })
  }
  cancel = () => {
    this.setState({
      edit: false
    })
  }

  getUsers() {
    axios.get(`/api/users`).then(res => {
      this.setState({
        accounts: res.data
      })
    })
  }

  handleAccountChange = async () => {
    await this.setState({
      isRep: !this.state.isRep
    })
    console.log(this.state)
  }
  handleAdmin = async () => {
    await this.setState({
      isAdmin: !this.state.isAdmin
    })
    console.log(this.state)
  }



  render() {
    const { admin } = this.props.user
    return (
      <div>
        <h1>Users</h1>
        {
          admin ? (
            <div>
              {this.state.edit ? (
                <div>
                  <div>
                    <h1>Create User</h1>
                    <span>First Name</span>
                    <input onChange={(e) => this.setState({ firstName: e.target.value })} value={this.state.firstName} type='text'></input>
                    <span>Last Name</span>
                    <input onChange={(e) => this.setState({ lastName: e.target.value })} value={this.state.lastName} type='text'></input>
                    <span>Email</span>
                    <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type='text'></input>
                    <span>Password</span>
                    <input onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type='text'></input>
                  </div>
                  <div>
                    <form>
                      <span>Account Type: </span>
                      <input type="radio" />
                      <span>Designer </span>
                      <input type="radio" onChange={this.handleAccountChange} />
                      <span>Sales Rep </span>
                      <input type="radio" onChange={this.handleAdmin} />
                      <span>Administrator </span>
                    </form>
                  </div>
                  <div>
                    <button onClick={() => this.createUser()} >Create User</button>
                    <button onClick={() => this.cancel()} >Cancel</button>
                  </div>
                </div>
              ) : (
                  <div>
                    <div>
                      <button onClick={() => this.handleNewClick()}>New User</button>
                    </div>
                    {this.state.accounts.map(item => {
                      return <User key={item.user_id} account={item}
                        accounts={this.state.accounts}
                         />
                    })}
                  </div>
                )
              }
            </div>
          ) : (
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
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Register)
