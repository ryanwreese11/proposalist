import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class Inverters extends Component {
  render() {
const{inv_name, inv_type} = this.props.inverter

    return (
      <div style={{borderBottom: '1px solid black' }}>
        <h2>{inv_name}</h2>
        <h3>{inv_type}</h3>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Inverters)
