import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


// import { Link } from 'react-router-dom'

export class CreateCustomer extends Component {
  constructor(props) {
    super(props)

    this.state = {

      utilities: [],
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

  componentDidMount() {
    this.getUtilities()
  }

  newCust = () => {
    const { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress } = this.state
    axios.post(`/api/customers`, { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress }).then(res => {
      // console.log(res.data)
    }
    )
  }

  getUtilities = () => {
    axios.get(`/api/utilities`).then(res => {
      // console.log(res.data)
      this.setState({
        utilities: res.data
      })
    })
  }



  render() {

    let mappedUtilities = this.state.utilities.map((utility, i) => {
      return <option key={i}>{`${utility.utility_name}`}</option>
    })
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
            <option ></option>
            {mappedUtilities}

          </select>
          <span>Notes:</span>
          <input onChange={(e) => this.setState({ notes: e.target.value })} value={this.state.notes} type='text'></input>
        </div>
        <div>
          <span>Appt Date: </span>
          <input onChange={(e) => this.setState({ apptDate: e.target.value })} value={this.state.apptDate} type="date"></input>
          <span>Time: </span>
          <input onChange={(e) => this.setState({ apptTime: e.target.value })} value={this.state.apptTime} type="time"></input>
        </div>
        <Link to='/'>
          <button onClick={() => this.newCust()}>Create Customer</button>
        </Link>



      </div>
    )
  }
}

export default CreateCustomer
