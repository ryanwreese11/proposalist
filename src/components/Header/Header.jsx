import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
import '../Header/Header.css'
import axios from 'axios';
require('dotenv').config()
const { REACT_APP_LOGOUT } = process.env



export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewUser: false,
      editUser: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isAdmin: false,
      isRep: false,
      edit: false,
      dark: '',
    }
  }

  componentDidMount() {
    this.props.getData()

  }

  setDark = () => {
    this.setState({
      dark: true
    })
  }

  setLight = () => {
    this.setState({
      dark: false
    })
  }

  toggleEdit = () => {
    this.setState({
      viewUser: !this.state.viewUser
    })
  }

  toggleUpdate = () => {
    this.setState({
      editUser: !this.state.editUser
    })
  }

  updateUser = async () => {
    const { id } = this.props.user
    const { firstName, lastName, email, dark } = this.state
    let reqBody = { id, firstName, lastName, email, dark }
    await axios.put(`/api/user/${id}`, reqBody).then(res => {
      this.props.getData()
    })
  }

  render() {
    const { viewUser, editUser } = this.state
    const { firstName, lastName, id, admin, dark, email } = this.props.user
    return (
      <header className={dark ? "header headerDark" : "header"} >
        <div>
          <span style={{ color: 'rgb(228, 159, 56)', fontSize: '3rem' }} className={dark ? 'button buttonDark' : 'button'}>Proposalist</span>
        </div>

        <div className={viewUser ? 'editUser slide' : 'editUser'}>

          <div >
            <button onClick={() => this.toggleEdit()} className={dark ? 'button buttonDark' : 'button'}>
              x
            </button>
          </div>

          <div>
            <div>

              <span>Name: {firstName} </span>
              <span>{lastName} </span>
              <span>Email: {email}</span>
            </div>
            <div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceAround' }}>
              <span>Display: {dark ? 'Dark' : 'Light'}</span>
              <div>
                <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.toggleUpdate()}>Edit</button>
                <a href={REACT_APP_LOGOUT}>
                  <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.toggleEdit()}>Logout</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={editUser ? 'updateUser slide2' : 'updateUser'}>

          <div>

            <span> First Name: </span>
            <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ firstName: e.target.value })} value={this.state.firstName} type='text' ></input>

            <span> Last Name: </span>
            <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ lastName: e.target.value })} value={this.state.lastName} type='text' ></input>

            <span> Email: </span>
            <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type='text'></input>
          </div>

          <form >
            <span>View: </span>
            <span>Light </span>
            <input className={dark ? 'input inputDark' : 'input'} type="radio" name='dark' onChange={this.setLight} />
            <span>Dark </span>
            <input className={dark ? 'input inputDark' : 'input'} type="radio" name='dark' onChange={this.setDark} />
          </form>

          <div>
            <button className={dark ? 'button buttonDark' : 'button'} onClick={() => { this.toggleUpdate(); this.toggleEdit(); this.updateUser() }}>Update Account</button>
            <button onClick={() => { this.toggleEdit(); this.toggleUpdate() }} className={dark ? 'button buttonDark' : 'button'}>
              Cancel
            </button>
          </div>
        </div>

        <div >
          {
            id && admin ? (
              <div className="headerRight">

                <div className="headerButtonsWrapper">
                  <div className="headerButtons">
                    <div>
                      <Link to='/'>
                        <button className={dark ? 'button buttonDark' : 'button'}>Customers</button>
                      </Link>
                    </div>
                    <div>
                      <Link to='/loans'>
                        <button className={dark ? 'button buttonDark' : 'button'}>Loan Products</button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/equipment">
                        <button className={dark ? 'button buttonDark' : 'button'}>Equipment</button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/utilities">
                        <button className={dark ? 'button buttonDark' : 'button'}>Utilities</button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/register">
                        <button className={dark ? 'button buttonDark' : 'button'}>Users</button>
                      </Link>
                    </div>

                    <button onClick={() => this.toggleEdit()} className={dark ? 'button buttonDark' : 'button'}>
                      Account
                    </button>

                  </div>
                </div>
              </div>
            ) : id ? (
              <div >

                <div className="headerButtonsWrapper">
                  <div className="headerButtons">
                    <div>
                      <Link to='/'>
                        <button className={dark ? 'button buttonDark' : 'button'}>Customers</button>
                      </Link>
                    </div>
                    <button onClick={() => this.toggleEdit()} className={dark ? 'button buttonDark' : 'button'}>
                      {firstName} {lastName}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
                  <div className="headerButtons">
                    <Link to='/login'>
                      <button className={dark ? 'button buttonDark' : 'button'}>Login</button>
                    </Link>
                  </div>
                )
          }

        </div>
      </header>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Header)


