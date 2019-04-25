import React, { Component } from 'react'
import { connect } from 'react-redux'


export class Utility extends Component {

  render() {
    const { utility_name, utility_rate, utility_ppw, utility_location } = this.props.utility

    return (
      <div>
        <div style={{ borderBottom: '1px solid black' }}>
          <div>
            <h3>{utility_name}</h3>
          </div>
          <ul>
            <li>{utility_location}</li>
            <li>Rate: ${utility_rate}/kWh</li>
            <li>Area Pricing: ${utility_ppw}/watt</li>
          </ul>
          
          <button>Edit Utility</button>
        </div>
      </div>
    )
  }
}



const mapState = (reduxState) => reduxState

export default connect(mapState)(Utility)