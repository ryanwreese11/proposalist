import React, { Component } from 'react'

import { Link } from 'react-router-dom'

export class Header extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
        <Link to='/'>
          <h1>Proposalist</h1>
        </Link>
        </div>
        <div>
          Logout
        </div>
      </div>
    )
  }
}

export default Header
