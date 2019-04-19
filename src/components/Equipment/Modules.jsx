import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class Modules extends Component {
  render() {
    const { mod_name, mod_size } = this.props.module

    return (
      <div style={{ borderBottom: '1px solid black' }}>
        <div>
          <h2>{mod_name}</h2>
          <h3>Module Size: {mod_size} watts</h3>
        </div>
        <div>
          <button>Edit Module</button>
          <button>Remove Module</button>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Modules)
