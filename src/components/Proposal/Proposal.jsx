import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
import { connect } from 'react-redux'





export class Proposal extends Component {
  constructor() {
    super()
    this.state = {
      proposals: [],
      firstName: '',
      lastName: '',
    }
  }

  componentDidMount = async () => {
    await this.getProposalById()
    console.log(this.props)
    await this.getCustomer()
    this.props.getData()

  }


  getProposalById = () => {
    axios.get(`/api/proposals/${this.props.match.params.cust_id}`).then(res => {
      this.setState({
        proposals: res.data
      })
      console.log(this.state.proposals)
    })
  }


  async getCustomer() {
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

    }).catch(err => {
      console.log('asdf', err)
    })



    console.log(this.props)
  }
  
  render() {
    const { dark } = this.props.user
    let mappedProposals = this.state.proposals.map((proposal, i) => {
        
        console.log(proposal)
      return <div className={dark ? 'items itemsDark' : 'items'} key={i} value={module.mod_name}>
        <div >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Cost: ${proposal.prop_system_cost}</span>
            <span>Size: {proposal.prop_size}</span>
            <span>Production: {proposal.prop_production} kWh/annually</span>
            <span>Loan: {proposal.loan_name}</span>
            <span>ID: {proposal.prop_id} </span>
          </div>
          <Link to={`/proposalview/${proposal.prop_id}`}>
            <button className={dark ? 'button buttonDark' : 'button'}>View Proposal</button>
          </Link>
          
           
        
        </div>

      </div>
    
    })
    return (
      <div className={this.props.user.dark ? 'itemsWrapper itemsWrapperDark' : "itemsWrapper"} >
        <h3>Proposals</h3>
        <Link to={`/system/${this.props.match.params.cust_id}`}>
          <button className={dark ? 'button buttonDark' : 'button'}>New Proposal</button>
        </Link>
        {mappedProposals}
        <div className='filler'></div>

      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Proposal)
