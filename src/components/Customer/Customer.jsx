import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'



export class Customer extends Component {


  render() {
    console.log(this.props)
    const multiply = (num1, num2) => {
      return Math.floor(num1 * num2)
    }


    const { cust_first_name, cust_last_name, cust_email, cust_address, cust_usage, cust_notes, user_appt_date, user_appt_time, utility_name, utility_rate } = this.props.customer
    return (
      <div style={{ borderBottom: '1px solid black' }}>

        <div>
          <div>
            <h1>{cust_first_name} {cust_last_name}</h1>

            <span>Email: {cust_email} </span>
            <span>Address: {cust_address} </span>
          </div>
          <div>
            <span>Utility: {utility_name} </span>
            <span>Annual Usage:{cust_usage} </span>
            <span>Annual Bill: $ {multiply(cust_usage, utility_rate)} </span>
            <span>Notes: {cust_notes} </span>
          </div>
          <div>
            <span>Appt: {user_appt_date} at {user_appt_time}</span>
          </div>
        </div>
        <Link to='./usage'>
          Usage
        </Link>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Customer)