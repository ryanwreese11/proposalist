import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'




export class Customer extends Component {



  customerView = () => {
    const { cust_first_name, cust_last_name, cust_email, cust_address, cust_usage, cust_notes, user_appt_date, user_appt_time, utility_name, utility_rate, cust_progress, user_first_name, user_last_name } = this.props.customer
    const multiply = (num1, num2) => {
      return Math.floor(num1 * num2)
    }
    return (
      <div style={{ borderBottom: '1px solid black' }}>

        <div style={{ borderBottom: 'none' }}>
          <div>
            <h1>{cust_first_name} {cust_last_name}</h1>
            <span>Sales Rep: </span>
            <span>{user_first_name} {user_last_name}</span>
          </div>
          <div>
            <span >Progress</span>
            <h5>{cust_progress}</h5>

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
      </div>
    )
  }


  render() {
    // console.log(this.props)


    const { cust_progress, cust_id } = this.props.customer



    return (
      cust_progress === 'New' ? (
        <Link to={`/usage/${cust_id}`}>
          <div>{this.customerView()}</div>
        </Link>
      ) : cust_progress === 'Building Proposal' ? (
        <Link to={`/system/${cust_id}`}>
          <div>{this.customerView()}</div>
        </Link>
      ) : cust_progress === 'Proposal' ? (
        <Link to={`/proposal/${cust_id}`}>
          <div>{this.customerView()}</div>
        </Link>
      ) : (
              <div></div>
            )


    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Customer)