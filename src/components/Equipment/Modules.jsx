import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class Modules extends Component {
  render() {
    const { mod_name, mod_size } = this.props.module

    return (
      <div className="items" style={{ borderBottom: '1px solid black' }}>
        <div>
          <span>{mod_name}</span>
          <span>Module Size: {mod_size} watts</span>
        </div>
        <div>
          <button>Edit Module</button>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Modules)
