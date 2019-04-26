import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class Modules extends Component {
  render() {
    const { mod_name, mod_size } = this.props.module

    return (
      <div className="items" style={{ borderBottom: '1px solid black' }}>
        <ul>
          <li>{mod_name}</li>
          <li>Module Size: {mod_size} watts</li>
        </ul>
        <div>
          <button>Edit Module</button>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Modules)
