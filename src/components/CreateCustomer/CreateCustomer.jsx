import React, { Component } from 'react'

import { Link } from 'react-router-dom'

export class CreateCustomer extends Component {
  render() {
    return (
      <div>
        <div>
          <span>Name:</span>
          <input type='text'></input>
          <span>Email:</span>
          <input type='text'></input>
          <span>Address:</span>
          <input type='text'></input>
          <span>Utility: </span>
          <select>
            <option placeholder="select utility"></option>
            <option value="excelEnergy">Excel Energy</option>
            <option value="rmp">Rocky Mountain Power</option>
            <option value="irea">IREA</option>
            <option value="unitedPower">United Power</option>
          </select>
          <span>Notes:</span>
          <input type='text'></input>
        </div>
        <div>
          <span>Appt: </span>
          <span>Date: </span>
          <input type="date"></input>
          <span>Time: </span>
          <input type="time"></input>
        </div>
        <Link to='/customer'>
          <button>Create Customer</button>
        </Link>


      </div>
    )
  }
}

export default CreateCustomer
