import React, { Component } from 'react'

import {Link} from 'react-router-dom'

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Link to='/newcust'>
          <button>New Customer</button>
        </Link>
      </div>
    )
  }
}

export default Dashboard
