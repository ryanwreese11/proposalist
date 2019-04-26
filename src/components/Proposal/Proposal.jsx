import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'




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
  }

  render() {
    console.log(this.state)

    let mappedProposals = this.state.proposals.map((proposal, i) => {
      return <div className="items" key={i} value={module.mod_name}>
        <div >
          <ul>
            <li>Cost: ${proposal.prop_system_cost}</li>
            <li>Size: {proposal.prop_size}</li>
            <li>Production: {proposal.prop_production} kWh/annually</li>
            <li>Loan: {proposal.loan_name}</li>
            <li>ID: {proposal.prop_id} </li>
          </ul>
          <Link to={`/proposalview/${proposal.prop_id}`}>
            <button>View Proposal</button>
          </Link>
        </div>
      </div>
    })

    return (
      <div>
        <h3>Proposals</h3>
        <Link to={`/system/${this.props.match.params.cust_id}`}>
          <button>New Proposal</button>
        </Link>
        {mappedProposals}

      </div>
    )
  }
}

export default Proposal
