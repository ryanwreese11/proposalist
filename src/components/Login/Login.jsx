import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { getData } from './../../ducks/userReducer'
import { connect } from 'react-redux'
import '../Login/Login.css'



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
    const { dark } = this.props.user
    return (
      <div className="login">
        <div className={this.props.user.dark ? 'itemsWrapper itemsWrapperDark' : "itemsWrapper"}>
          <h1>Login</h1>
          <div>
            <div className={dark ? 'createSystem createSystemDark' : 'createSystem'}>
              <div className='customerInputsWrapper'>
                <div className='customerInputsWrapper2'>
                  <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                    <span>Email</span>
                    <span>Password</span>
                    <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.login()}>Login</button>
                  </div>
                  <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                    <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type='text'></input>
                    <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type='password'></input>
                    <span>No account? Register </span>
                    <Link to='/register'>
                      <button className={dark ? 'button buttonDark' : 'button'}>Here</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='filler'></div>

        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Login)
