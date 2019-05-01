import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'
import '../ProposalView/ProposalView.css'
import BarChart from './../Chart/BarChart'
import { Doughnut } from 'react-chartjs-2'
import OffsetChart from '../Chart/OffsetChart'
import { Link } from 'react-router-dom'



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

    }, () => this.setSystemSize(this.state.moduleCount, this.state.moduleSize))


  }

  // to handle removing panels to the proposal
  decrementModuleCount = () => {
    this.setState({
      moduleCount: this.state.moduleCount - 1
    }, () => this.setSystemSize(this.state.moduleCount, this.state.moduleSize))
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



  render() {






    let diff = (num1, num2) => {
      return num1 - num2
    }







    console.log(this.props)

    const { firstName, lastName, address, email, usage, inverter, module, prePmtFactor, postPmtFactor,  systemSize,  utility, ppw, utilityRate, loanName, repFirstName, repLastName, moduleCount, propRatio } = this.state

    const multiply = (num1, num2) => {
      return num1 * num2
    }

    const divide = (num1, num2) => {
      return num1 / num2
    }
    const subtract = (num1, num2) => {
      return num1 - num2
    }

    const { dark } = this.props.user

    // console.log(productionOffset)
    return (
      <div className='body'>
        <div className='customerPropInfo'>
          <div>
            <span>{firstName} {lastName}</span>
          </div>
          <div>
            <span>{address}</span>
          </div>
          <span>{email}</span>
        </div>
        <div className='repInfo'>{repFirstName} {repLastName}</div>
        <div>
          <div className='barChart'>
            <BarChart usage={this.state.usage} utilityRate={this.state.utilityRate} />
          </div>
          <div className='currentBill' >
            <span>${multiply(usage, utilityRate / 12).toFixed(2)}</span>
            <span>${multiply(usage, utilityRate).toFixed(2) * 2}</span>
            <span>4%</span>
            <span>${multiply(usage, utilityRate).toFixed(2)}</span>
          </div>
          <div className='currentAnnualBill'>
          </div>
          <div>
            <div className="systemSize" >{systemSize / 1000} kW</div>
          </div>
          <div className='equipment'>
            <div>{moduleCount} {module} watts</div>
            <div>{inverter}</div>
          </div>
          <div className='moduleButtons'>
            <button className={dark ? 'button buttonDark' : 'button'} onClick={() => { this.incrementModuleCount(); this.setSystemSize(this.state.moduleCount, this.state.moduleSize) }}>Add Panel</button>
            <button className={dark ? 'button buttonDark' : 'button'} onClick={() => { this.decrementModuleCount(); this.setSystemSize(this.state.moduleCount, this.state.moduleSize) }}>Remove Panel</button>
          </div>
          <div className='production'>
            <div > {Math.floor(propRatio * systemSize / 1000)} kWh</div>
          </div>
          <div className='offsetChart'>
            <Doughnut
              data={{
                labels: ['Solar', 'Utility'],
                datasets: [
                  {
                    label: 'Offset',
                    data: [

                      usage, diff(usage, Math.floor(propRatio * systemSize / 1000) )
                    ],
                    backgroundColor: [
                      'rgb(228, 159, 56)',
                      'rgb(89, 89, 89)',

                    ]
                  }
                ]
              }}
              options={{
                title: {
                  display: true,
                  text: 'Usage Offset',
                  fontSize: 0,
                  fontColor: '#000'
                },
                legend: {
                  display: true,
                  position: 'bottom',
                  labels: { fontColor: '#000' }
                }
              }} />
          </div>
          <div className='utilityPower'>
            <div>{Math.floor(subtract(100, divide((propRatio * systemSize / 1000), usage) * 100))}%</div>
          </div>
          <div className='offset'>
            <div>{Math.floor(divide((propRatio * systemSize / 1000), usage) * 100)}%</div>
          </div>
          <div className='productionChart'>
            <OffsetChart
              usage={this.state.usage}
              propRatio={this.state.propRatio}
              systemSize={this.state.systemSize} />
          </div>
        </div>
        {/* <div className='offsetChart'>
            <Chart usage={this.state.usage} production={this.state.production} propRatio={this.props.propRatio} systemSize={this.props.systemSize}/>
          </div> */}
        <div className='financialDetails'>
          <div>
            <div>Total System Cost ${(systemSize * ppw).toFixed(2)}</div>
            <div>Federal Tax Incentive ${multiply((systemSize * ppw), .3).toFixed(2)}</div>
            <div>Net System Cost ${multiply((systemSize * ppw), .7).toFixed(2)}</div>
          </div>
          <div>
            <div>Pre Payment ${multiply(prePmtFactor, (systemSize * ppw)).toFixed(2)}</div>
            <div>Post Payment ${multiply(postPmtFactor, (systemSize * ppw)).toFixed(2)}</div>
            <div>{loanName}</div>
            <div>Utility: {utility}</div>
          </div>
        </div>
        <div>
          <Link to='/'>
            <button className={dark ? 'button buttonDark' : 'button'}>Submit New Proposal for signature.</button>
          </Link>
        </div>

        <div>
        </div>


      </div>

    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(ProposalView)
