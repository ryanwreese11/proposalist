import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
require('dotenv').config()
const {REACT_APP_LOGIN} = process.env



export class Header extends Component {

  componentDidMount() {
    this.props.getData()

  }

  render() {
    console.log(this.props)
    const { name, id, admin } = this.props.user
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to='/'>
            <h1>Proposalist</h1>
          </Link>
        </div>
        <div>
          {
            id && admin ? (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div >
                  <span>Admin User, {name} </span>
                </div>
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
            ) : id ? (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div >
                  Hello {name}
                </div>
                <a href={REACT_APP_LOGIN}>
                  <button>Logout</button>
                </a>
              </div>
            ) : (
                  <div>
                    <Link to='/login'>
                      <button>Login</button>
                    </Link>
                  </div>
                )
          }

        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Header)
