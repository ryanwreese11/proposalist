import React, { Component } from 'react'
import { connect } from 'react-redux'


export class Utility extends Component {

  render() {
    const { utility_name, utility_rate } = this.props.utility

    return (
      <div style={{borderBottom: '1px solid black' }}>
        <div>
          <h2>{utility_name}</h2>
        </div>
        <div>
          <span>${utility_rate}/kWh</span>
        </div>
        <button>Edit Utility</button>
        <button>Delete Utility</button>
      </div>
    )
  }
}



const mapState = (reduxState) => reduxState

export default connect(mapState)(Utility)