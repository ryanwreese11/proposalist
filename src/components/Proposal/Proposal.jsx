import React, { Component } from 'react'
import axios from 'axios'

export class Proposal extends Component {

  componentDidMount = async () => {
    
    console.log(this.props)
    await this.getCustomer()

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
   
    return (
      <div>
        <h1>Proposal</h1>
      </div>
    )
  }
}

export default Proposal
