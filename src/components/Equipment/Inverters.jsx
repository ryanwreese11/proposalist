import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class Inverters extends Component {
  render() {
    const { inv_name, inv_type } = this.props.inverter
    const { dark } = this.props.user

    return (
      <div className={dark ? 'items itemsDark' : 'items'}>
        <div>
          <div>
            <span>{inv_name}</span>
          </div>
          <div>
            <span>{inv_type}</span>
          </div>
        </div>
        <div style={{textAlign: 'center'}}>
          <button className={dark ? 'button buttonDark' : 'button'}>Edit Inverter</button>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Inverters)
