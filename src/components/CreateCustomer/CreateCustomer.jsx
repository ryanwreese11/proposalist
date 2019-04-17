import React, { Component } from 'react'
import axios from 'axios'

// import { Link } from 'react-router-dom'

export class CreateCustomer extends Component {
  constructor(props) {
    super(props)

    this.state = {


      firstName: '',
      lastName: '',
      email: '',
      address: '',
      utility: '',
      notes: '',
      apptDate: '',
      apptTime: '',
      custProgress: 'New'
    }
  }

  newCust() {
    const { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress} = this.state
    const res =  axios.post('/api/customers', { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress}).then(() => {
      res.status(200).send('New Listing Created')
    })
  }

  render() {
    return (
      <div>
        <div>
          <span>First Name:</span>
          <input onChange={(e) => this.setState({ firstName: e.target.value })} value={this.state.firstName} type='text'></input>
          <span>Last Name:</span>
          <input onChange={(e) => this.setState({ lastName: e.target.value })} value={this.state.lastName} type='text'></input>
          <span>Email:</span>
          <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type='text'></input>
          <span>Address:</span>
          <input onChange={(e) => this.setState({ address: e.target.value })} value={this.state.address} type='text'></input>
          <span>Utility: </span>
          <select onChange={(e) => this.setState({ utility: e.target.value })} value={this.state.utility}>
            <option placeholder="select utility"></option>
            <option value="Excel Energy">Excel Energy</option>
            <option value="rmp">Rocky Mountain Power</option>
            <option value="irea">IREA</option>
            <option value="unitedPower">United Power</option>
          </select>
          <span>Notes:</span>
          <input onChange={(e) => this.setState({ notes: e.target.value })} value={this.state.notes} type='text'></input>
        </div>
        <div>
          <span>Appt Date: </span>
          <input onChange={(e) => this.setState({ apptDate: e.target.value })} value={this.state.apptDate} type="date"></input>
          <span>Time: </span>
          <input onChange={(e) => this.setState({ apptTime: e.target.value })} value={this.state.apptTime}type="time"></input>
        </div>
        
          <button onClick={() => this.newCust()}>Create Customer</button>
        


      </div>
    )
  }
}

export default CreateCustomer
