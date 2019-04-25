import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'
import Chart from './../Chart/Chart'

export class ProposalView extends Component {

  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      usage: '',
      inverter: '',
      module: '',
      moduleSize: '',
      moduleCount: '',
      prePmtFactor: '',
      postPmtFactor: '',
      production: '',
      systemSize: '',
      systemCost: '',
      utility: '',
      ppw: '',
      utilityRate: '',
      loanName: '',
      loanTerm: '',
      interest: '',
      repFirstName: '',
      repLastName: '',
      propRatio: ''


    }
  }

  componentDidMount = async () => {
    await this.getProposalByPropId()
    this.setProduction(this.state.propRatio, this.state.systemSize)
    await this.props.getData()



  }

  async getProposalByPropId() {
    await axios.get(`/api/proposalview/${this.props.match.params.prop_id}`).then(res => {
      this.setState({
        firstName: res.data[0].cust_first_name,
        lastName: res.data[0].cust_last_name,
        address: res.data[0].cust_address,
        email: res.data[0].cust_email,
        usage: res.data[0].cust_usage,
        inverter: res.data[0].inv_name,
        module: res.data[0].mod_name,
        moduleSize: res.data[0].mod_size,
        moduleCount: res.data[0].mod_count,
        prePmtFactor: res.data[0].pre_pmt_factor,
        postPmtFactor: res.data[0].post_pmt_factor,
        production: res.data[0].prop_production,
        systemSize: res.data[0].prop_size,
        systemCost: res.data[0].prop_system_cost,
        utility: res.data[0].utility_name,
        ppw: res.data[0].utility_ppw,
        utilityRate: res.data[0].utility_rate,
        loanName: res.data[0].loan_name,
        loanTerm: res.data[0].loan_term,
        interest: res.data[0].loan_interest,
        repFirstName: res.data[0].user_first_name,
        repLastName: res.data[0].user_last_name,
        propRatio: res.data[0].prop_ratio

      })
      console.log(this.state)

    })
  }

  // to handle adding panels to the proposal
  incrementModuleCount = () => {
    this.setState({
      moduleCount: this.state.moduleCount + 1

    }, () => this.setProduction(this.state.propRatio, this.state.systemSize))


  }

  // to handle removing panels to the proposal
  decrementModuleCount = () => {
    this.setState({
      moduleCount: this.state.moduleCount - 1
    }, () => this.setProduction(this.state.propRatio, this.state.systemSize))
  }

  incrementSystemCost = () => {
    this.setState({
      ppw: parseFloat(this.state.ppw + .05)
    })
  }

  setSystemSize = (num1, num2) => {
    let total = Math.floor(Number(num1 * num2).toFixed(2))
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
  setProduction = (num1, num2) => {
    let total3 = Math.floor((num1 * num2) / 1000)
    this.setState({
      production: total3
    })
  }





  render() {
    console.log(this.props)

    const { firstName, lastName, address, email, usage, inverter, module, prePmtFactor, postPmtFactor, production, systemSize, systemCost, utility, ppw, utilityRate, loanName, loanTerm, interest, repFirstName, repLastName, moduleCount, propRatio } = this.state

    const multiply = (num1, num2) => {
      return num1 * num2
    }

    const divide = (num1, num2) => {
      return num1 / num2
    }



    console.log(this.state)
    return (
      <div>
        <div>
          <span>{firstName}</span>
          <span>{lastName}</span>
          <span>{address}</span>
          <span>{email}</span>
        </div>
        <div>
          <div>{repFirstName} {repLastName}</div>
          <div name="systemSize" >System Size: {systemSize / 1000} kW</div>
          <div>{moduleCount} {module} watts</div>
          <button onClick={() => {this.incrementModuleCount();this.setSystemSize(this.state.moduleCount, this.state.moduleSize)}}>Add Panel</button>
          <button onClick={() => this.decrementModuleCount()}>Remove Panel</button>
          <div>Inverter: {inverter}</div>
          <div > {Math.floor(propRatio * systemSize / 1000)} kWh/Annually</div>
          <div>Offset: {Math.floor(divide((propRatio * systemSize / 1000), usage) * 100)}%</div>
        </div>
        <div>
          <div>Total System Cost ${(systemSize * ppw).toFixed(2)}</div>
          <button onClick={() => this.incrementSystemCost()}></button>
          <div>Federal Tax Incentive ${multiply(systemCost, .3).toFixed(2)}</div>
          <div>Net System Cost ${multiply((systemSize * ppw), .7).toFixed(2)}</div>
          <div>Pre Payment ${multiply(prePmtFactor, (systemSize * ppw)).toFixed(2)}</div>
          <div>Post Payment ${multiply(postPmtFactor, (systemSize * ppw)).toFixed(2)}</div>
          <div>{loanName}</div>
        </div>
        <div>
          <div>Utility: {utility}</div>
          <div>Current Average Bill: ${multiply(usage, utilityRate / 12).toFixed(2)}</div>
        </div>
        <Chart usage={this.state.usage} production={this.state.production} legendPosition="bottom" />
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(ProposalView)
