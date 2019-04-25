import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
import Customer from '../Customer/Customer'
import axios from 'axios'


export class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      customers: []
    }
  }



  componentDidMount = async () => {
    await this.props.getData()
    // console.log(this.props)
    if (this.props.user.rep) {
      this.getCustomersById(this.props.user.id)
    } else {
      this.getCustomers()
    }
  }

  getCustomers = async () => {
    await axios.get(`/api/customers`).then(res => {
      this.setState({
        customers: res.data
      })
    })
  }

  getCustomersById = async () => {
    let { id } = this.props.user

    await axios.get(`/api/customers/${id}`).then(res => {
      this.setState({
        customers: res.data
      })
    })
  }


  render() {
    // console.log(this.props)
    
    return (
      <div>
        <h1>Dashboard</h1>

        <Link to='/newcust'>
          <button>New Customer</button>
        </Link>

        {this.state.customers.map(item => {
          return <Customer key={item.cust_id} customer={item}
            customers={this.state.customers}
          />
        })}

      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Dashboard)
