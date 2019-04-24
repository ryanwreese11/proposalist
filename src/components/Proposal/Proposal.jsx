import React, { Component } from 'react'
import axios from 'axios'

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
    this.getProposalById()
    console.log(this.props)
    await this.getCustomer()

  }

  // to handle adding panels to the proposal
  incrementPanelCount = () => {
    this.setState()
  }

  // to handle removing panels to the proposal
  decrementPanelCount = () => {
    this.setState()
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
      console.log(res.data[0])

    }).catch(err => {
      console.log('asdf', err)
    })
  }

  render() {

    let mappedProposals = this.state.proposals.map((proposal, i) => {
      return <span key={i} value={proposal.mod_name}>{`${proposal.prop_id} ${proposal.prop_size / 1000}kW ${proposal.loan_name}`}</span>
    })

    return (
      <div>
        <h1>Proposal</h1>
        <h2>{this.state.firstName} {this.state.lastName}</h2>
        <div>
          {mappedProposals}
        </div>
      </div>
    )
  }
}

export default Proposal
