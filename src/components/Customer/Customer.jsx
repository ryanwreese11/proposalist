import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export class Customer extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Customer</h1>
        <div>
          <span>Name: </span>
          <span>Email: </span>
          <span>Address: </span>
          <span>Notes: </span>
          <span>Utility: </span>
          <span>Annual Usage: </span>
          <span>Annual Bill: $</span>
        </div>
        <Link to='./usage'>
          Usage
        </Link>
      </div>
    )
  }
}

export default Customer
