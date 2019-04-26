import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
require('dotenv').config()
const { REACT_APP_LOGIN} = process.env



export class Header extends Component {

  componentDidMount() {
    this.props.getData()

  }

  render() {
    console.log(this.props)
    const { name, id, admin } = this.props.user
    return (
      <header >
        <div>
          <Link to='/'>
            <button>Proposalist</button>
          </Link>
        </div>
        <div >
          {
            id && admin ? (
              <div className="headerRight">
                <div >
                  <span>Admin User, {name} </span>
                </div>
                <div className="headerButtons">
                  <div>
                    <Link to='/loans'>
                      <button>Loan Products</button>
                    </Link>
                  </div>
                  <div>
                    <Link to="/equipment">
                      <button>Equipment</button>
                    </Link>
                  </div>
                  <div>
                    <Link to="/utilities">
                      <button>Utilities</button>
                    </Link>
                  </div>
                  <div>
                    <Link to="/register">
                      <button>Users</button>
                    </Link>
                  </div>
                  <a href={REACT_APP_LOGIN}>
                    <button>Logout</button>
                  </a>
                </div>
              </div>
            ) : id ? (
              <div >
                <div >
                  Hello {name}
                </div>
                <div className="headerButtons">
                  <a href={REACT_APP_LOGIN}>
                    <button>Logout</button>
                  </a>
                </div>
              </div>
            ) : (
                  <div className="headerButtons">
                    <Link to='/login'>
                      <button>Login</button>
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
