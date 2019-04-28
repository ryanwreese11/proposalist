import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'
import { Link } from 'react-router-dom'


export class System extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      systemSize: '',
      production: '',
      systemCost: '',
      ppw: '',
      firstName: '',
      lastName: '',
      utility: '',
      usage: '',
      modules: [],
      moduleName: '',
      moduleSize: '',
      moduleAmount: '',
      inverters: [],
      inverterName: '',
      inverterType: '',
      loans: [],
      loanName: '',
      loanTerm: '',
      loanInterest: '',
      custId: '',
      propSigned: false,
      custProgress: 'Proposal',
      propRatio: ''


    }
    console.log(this.props)
  }


  componentDidMount = async () => {
    await this.props.getData()
    this.getCustomer()
    this.getModules()
    this.getInverters()
    this.getLoans()
  }

  newProposal = () => {
    const { custId, utility, moduleName, inverterName, loanName, production, systemCost, systemSize, propSigned, moduleAmount, propRatio } = this.state
    axios.post(`/api/proposals`, { custId, utility, moduleName, inverterName, loanName, production, systemCost, systemSize, propSigned, moduleAmount, propRatio }).then(res => {

    })
  }

  async updateCustomer() {
    const { usage } = this.state
    const { cust_id } = this.props.match.params
    let reqBody = { cust_id, usage, custProgress: 'Proposal' }
    await axios.put(`/api/usage/${this.props.match.params.cust_id}`, reqBody).then(res => {
      console.log(res.data[0])
      this.setState = ({
        usage: res.data[0].cust_usage,
        custProgress: res.data[0].cust_progress
      })
    })

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
        custProgress: res.data[0].cust_progress,
        ppw: res.data[0].utility_ppw,
        custId: res.data[0].cust_id

      })


      console.log(res.data[0])
    }).catch(err => {
    })
  }

  getModules = () => {
    axios.get(`/api/modules`).then(res => {
      console.log(res.data)
      this.setState({
        modules: res.data
      })
      console.log(this.state.modules)
    })
  }

  getInverters = () => {
    axios.get(`/api/inverters`).then(res => {
      console.log(res.data)
      this.setState({
        inverters: res.data
      })
    })
  }

  getLoans = () => {
    axios.get(`/api/loans`).then(res => {
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


  setSystemSize = (num1, num2) => {
    let total = num1 * num2
    this.setState({
      systemSize: total
    })
  }
  setSystemCost = (num1, num2) => {
    let total2 = Math.floor(Number(num1 * num2).toFixed(2))
    this.setState({
      systemCost: total2
    })
  }

  setPropRatio = (num1, num2) => {
    let ratio = num1 / num2 * 1000
    this.setState({
      propRatio: ratio
    })
  }



  render() {
    const {dark} = this.props.user

    let mappedModules = this.state.modules.map((module, i) => {
      return <option key={i} value={module.mod_name}>{`${module.mod_name}`}</option>
    })


    let mappedInverters = this.state.inverters.map((inverter, i) => {
      return <option key={i}>{`${inverter.inv_name}`}</option>
    })


    let mappedLoans = this.state.loans.map((loans, i) => {
      return <option key={i}>{`${loans.loan_name}`}</option>

    })

    console.log(this.state)

    return (

      <div>
        <div>
          <h1>System</h1>
          <h1>{this.state.firstName} {this.state.lastName}</h1>
        </div>
        <span name="systemSize">System Size {this.state.systemSize / 1000} kW</span>
        <div>
        </div>
        <span name="systemCost">System Cost ${this.state.systemCost}.00</span>
        <div>
          <div>
          <div>
            <div>
              <span> Usage Offset: {Math.floor(this.state.production / this.state.usage * 100)}%</span>
            </div>
            <span>Production from Design Tool: </span>
            <input name="production" placeholder="production" onChange={this.handleChange}></input>
            <span> kWh/annually</span>
          </div>
            <span>Modules: </span>
            <input name='moduleAmount' onChange={this.handleChange} placeholder="count"></input>
          </div>
          <select name="moduleName" onChange={this.handleChange}>
            <option disabled>Select Module</option>
            {mappedModules}
          </select>
          <select name="moduleSize" onChange={this.handleChange}>
            <option disabled></option>
            <option>300</option>
            <option>320</option>
          </select>



         
          <button className={dark? 'button buttonDark' : 'button'} onClick={() => this.setSystemSize(this.state.moduleAmount, this.state.moduleSize)}>Calculate System Size</button>
          <div>
            <span>Inverter: </span>
          </div>
          <select name="inverterName" onChange={this.handleChange}>
            <option></option>
            {mappedInverters}
          </select>
      
          <div>
            <span>Financial Product: </span>
          </div>
          <select name="loanName" onChange={this.handleChange}>
            <option></option>
            {mappedLoans}
          </select>
          <button className={dark? 'button buttonDark' : 'button'} onClick={() => {this.setSystemCost(this.state.systemSize, this.state.ppw); this.setPropRatio(this.state.production, this.state.systemSize)}}>Calculate System Size</button>
   
        </div>
        <Link to={`/proposal/${this.props.match.params.cust_id}`}>
          <button className={dark? 'button buttonDark' : 'button'} onClick={() => { this.newProposal(); this.updateCustomer() }} >Create Proposal</button>
        </Link>
      </div>
    )
  }
}


const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(System)

