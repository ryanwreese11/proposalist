import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
// import Customer from '../Customer/Customer'
// import axios from 'axios'

export class Dashboard extends Component {

  

  componentDidMount() {
    this.props.getData()
  }



  render() {
    console.log(this.props)
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

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Dashboard)
