import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
import Customer from '../Customer/Customer'
import axios from 'axios'


import  '../Dashboard/Dashboard.css'


export class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      customers: [],
      dark: ''

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

  newCust = () => {
    const { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress } = this.state
    axios.post(`/api/customers`, { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress }).then(res => {
      this.getCustomers()
    }
    )
  }

  deleteCustomer= (id)=> {
    axios.delete(`/api/customers/${this.state.customers.id}`, id).then(res => {

     console.log(res)
      
    }).catch(err => console.log('there was an error.', err))
  
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

      console.log(this.props)

    const {dark} = this.props.user
    return (
      <div>
        <div className={this.props.user.dark ? 'dashboard dashboardDark' : "dashboard"}>
          <div>
            <h4>Dashboard</h4>
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
            <button className={dark? 'button buttonDark' : 'button'}>New Customer</button>
          </Link>
        </div>
        <div className={this.props.user.dark ? 'itemsWrapper itemsWrapperDark' : "itemsWrapper"}>
          {this.state.customers.map(item => {
            return <Customer key={item.cust_id} customer={item}
              customers={this.state.customers}
              deleteCustomer={this.deleteCustomer}
            />
          })}
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Dashboard)
