import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'



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
                  Admin User, {name}
                </div>
                <div>
                  <button>Loan Products</button>
                </div>
                <div>
                  <button>Equipment</button>
                </div>
                <div>
                  <button>Utilities</button>
                </div>
                <div>
                  <button>Users</button>
                </div>
                <a href="http://localhost:5678/logout">
                  <button>Logout</button>
                </a>
              </div>
            ) : id ? (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div >
                  Hello {name}
                </div>
                <a href="http://localhost:5678/logout">
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
