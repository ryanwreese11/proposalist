import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class Modules extends Component {
  render() {
    const { mod_name, mod_size } = this.props.module
    const {dark} = this.props.user

    return (
      <div className={dark ? 'items itemsDark' : 'items'}>
        <div>
          <span>{mod_name}</span>
          <span>Module Size: {mod_size} watts</span>
        </div>
        <div style={{textAlign: 'center'}}>
          <button className={dark? 'button buttonDark' : 'button'}>Edit Module</button>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Modules)
