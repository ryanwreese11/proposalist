import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class System extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      systemSize: '',
      production: '',
      systemCost: '',
      firstName: '',
      lastName: '',
      utility: '',
      usage: '',
      modules: [],
      moduleSize: '',
      moduleAmount: '',
      inverters: [],
      inverterSize: '',
      loans: []



    }
  }

  componentDidMount = async () => {
    await this.props.getData()
    await this.getCustomer()
    await this.getModules()
    await this.getInverters()
    await this.getLoans()
  }

  getCustomer = async () => {
    // const cust_id = this.props.match.params.id;
    await axios.get(`/api/usage/${this.props.match.params.cust_id}`).then(res => {
      this.setState({
        firstName: res.data[0].cust_first_name,
        lastName: res.data[0].cust_last_name,
        utility: res.data[0].utility_name,
        usage: res.data[0].cust_usage,
        utilityRate: res.data[0].utility_rate,
        custProgress: res.data[0].cust_progress

      })

      console.log(res.data[0])
    }).catch(err => {
    })
  }

  getModules = () => {
    axios.get('/api/modules').then(res => {
      console.log(res.data)
      this.setState({
        modules: res.data
      })
      console.log(this.state.modules)
    })
  }

  getInverters = () => {
    axios.get('/api/inverters').then(res => {
      console.log(res.data)
      this.setState({
        inverters: res.data
      })
    })
  }

  getLoans = () => {
    axios.get('/api/loans').then(res => {
      console.log(res.data)
      this.setState({
        loans: res.data
      })
    })
  }

  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {

    let mappedModules = this.state.modules.map((module, i) => {
      return <option key={i}>{`${module.mod_name} ${module.mod_size} watt`}</option>
    })
    let mappedInverters = this.state.inverters.map((inverter, i) => {
      return <option key={i}>{`${inverter.inv_name} ${inverter.inv_type}`}</option>
    })
    let mappedLoans = this.state.loans.map((loans, i) => {
      return <option key={i}>{`${loans.loan_name} ${loans.loan_term} yr ${loans.loan_interest}% interest`}</option>
    })
    return (

      <div>
        <div>
          <h1>System</h1>
          <h1>{this.state.firstName} {this.state.lastName}</h1>
        </div>
        <div>
          <div>
            <span>Modules: </span>
            <span>How Many? </span>
            <input name='moduleAmount' onChange={this.handleChange}></input>
          </div>
          <select onChange={this.handleChange}>
            {mappedModules}
          </select>
          <div>
            <span>Inverter: </span>
          </div>
          <select onChange={this.handleChange}>
            {mappedInverters}
          </select>
          <div>
            <span>Financial Product: </span>
          </div>
          <select onChange={this.handleChange}>
            {mappedLoans}
          </select>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(System)

