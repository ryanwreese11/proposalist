import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class Inverters extends Component {
  render() {
    const { inv_name, inv_type } = this.props.inverter

    return (
      <div className="items" style={{ borderBottom: '1px solid black' }}>
        <div>
          <span>{inv_name}</span>
          <span>{inv_type}</span>
        </div>
        <div>
          <button>Edit Inverter</button>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Inverters)
