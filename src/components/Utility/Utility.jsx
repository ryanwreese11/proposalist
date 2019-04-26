import React, { Component } from 'react'
import { connect } from 'react-redux'


export class Utility extends Component {

  render() {
    const { utility_name, utility_rate, utility_ppw, utility_location } = this.props.utility

    return (
      <div>
        <div className="items" style={{ borderBottom: '1px solid black' }}>
          <div>
            <h3>{utility_name}</h3>
          </div>
          <div>
            <span>{utility_location}</span>
            <span>Rate: ${utility_rate}/kWh</span>
            <span>Area Pricing: ${utility_ppw}/watt</span>
          </div>
          
          <button>Edit Utility</button>
        </div>
      </div>
    )
  }
}



const mapState = (reduxState) => reduxState

export default connect(mapState)(Utility)