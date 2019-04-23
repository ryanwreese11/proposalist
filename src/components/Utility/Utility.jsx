import React, { Component } from 'react'
import { connect } from 'react-redux'


export class Utility extends Component {

  render() {
    const { utility_name, utility_rate, utility_ppw, utility_location } = this.props.utility

    return (
      <div>
        <div style={{ borderBottom: '1px solid black' }}>
          <div>
            <h2>{utility_name}</h2>
            <span>{utility_location}</span>
          </div>
          <div>
            <span>Rate: ${utility_rate}/kWh</span>
          </div>
          <div>
            <span>Area Pricing: {utility_ppw}/watt</span>
          </div>
          <button>Edit Utility</button>
        </div>
      </div>
    )
  }
}



const mapState = (reduxState) => reduxState

export default connect(mapState)(Utility)