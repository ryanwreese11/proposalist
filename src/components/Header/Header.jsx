import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
import '../Header/Header.css'
require('dotenv').config()
const { REACT_APP_LOGOUT} = process.env



export class Header extends Component {

  componentDidMount() {
    this.props.getData()

  }

  render() {
 
    const { firstName, lastName, id, admin, dark } = this.props.user
    return (
      <header className={ dark ? "header headerDark": "header"} >
        <div>
          <Link to='/'>
            <button className={dark? 'button buttonDark' : 'button'}>Proposalist</button>
          </Link>
        </div>
        <div >
          {
            id && admin ? (
              <div className="headerRight">
                <div >
                  <span className={dark? 'button buttonDark' : 'button'}>{firstName} {lastName} </span>
                </div>
                <div className="headerButtons">
                  <div>
                    <Link to='/loans'>
                      <button className={dark? 'button buttonDark' : 'button'}>Loan Products</button>
                    </Link>
                  </div>
                  <div>
                    <Link to="/equipment">
                      <button className={dark? 'button buttonDark' : 'button'}>Equipment</button>
                    </Link>
                  </div>
                  <div>
                    <Link to="/utilities">
                      <button className={dark? 'button buttonDark' : 'button'}>Utilities</button>
                    </Link>
                  </div>
                  <div>
                    <Link to="/register">
                      <button className={dark? 'button buttonDark' : 'button'}>Users</button>
                    </Link>
                  </div>
                  <a href={REACT_APP_LOGOUT}>
                    <button className={dark? 'button buttonDark' : 'button'}>Logout</button>
                  </a>
                </div>
              </div>
            ) : id ? (
              <div >
                <div >
                {firstName} {lastName}
                </div>
                <div className="headerButtons">
                  <a href={REACT_APP_LOGOUT}>
                    <button className={dark? 'button buttonDark' : 'button'}>Logout</button>
                  </a>
                </div>
              </div>
            ) : (
                  <div className="headerButtons">
                    <Link to='/login'>
                      <button className={dark? 'button buttonDark' : 'button'}>Login</button>
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


