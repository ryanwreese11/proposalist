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

    let newCustomers = this.state.customers.filter(item => {
      return item.cust_progress === 'New'
    }).map(item => {
      return <div>{`${item.cust_progress}`}</div>
    })

    let buildingCustomers = this.state.customers.filter(item => {
      return item.cust_progress === 'Building Proposal'
    }).map(item => {
      return <div>{`${item.cust_progress}`}</div>
    })

    let proposalCustomers = this.state.customers.filter(item => {
      return item.cust_progress === 'Proposal'
    }).map(item => {
      return <div>{`${item.cust_progress}`}</div>
    })

    let soldCustomers = this.state.customers.filter(item => {
      return item.cust_progress === 'Sold'
    }).map(item => {
      return <div>{`${item.cust_progress}`}</div>
    })



    return (
      <div>
        <div className="dashboard">
          <div>
            <h1>Dashboard</h1>
          </div>
          <div className="progressNums">
            <div>
              <div>
                <div>New Customers</div>
              </div>
              <div>
                <span>{newCustomers.length}</span>
              </div>
            </div>
            <span>></span>
            <div>
              <div>Proposal in Progress</div>
              <span>{buildingCustomers.length}</span>
            </div>
            <span>></span>
            <div>
              <div>Completed Proposals</div>
              <span>{proposalCustomers.length}</span>
            </div>
            <span>></span>
            <div>
              <div>Signed Customers</div>
              <span>{soldCustomers.length}</span>
            </div>
          </div>
          <Link to='/newcust'>
            <button>New Customer</button>
          </Link>
        </div>
        <div className="customerWrapper">
          {this.state.customers.map(item => {
            return <Customer key={item.cust_id} customer={item}
              customers={this.state.customers}
            />
          })}
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Dashboard)
