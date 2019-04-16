import React, { Component } from 'react'

export class Usage extends Component {
  render() {
    return (
      <div>
        <h1>Usage</h1>

        <select>
          <option placeholder="select utility">Select Utility</option>
          <option value="excelEnergy">Excel Energy</option>
          <option value="rmp">Rocky Mountain Power</option>
          <option value="irea">IREA</option>
          <option value="unitedPower">United Power</option>
        </select>
      </div>
    )
  }
}

export default Usage
