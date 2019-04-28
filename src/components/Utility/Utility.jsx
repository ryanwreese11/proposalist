import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'


export class Utility extends Component {

  render() {
    const { utility_name, utility_rate, utility_ppw, utility_location } = this.props.utility
    const {dark} = this.props.user
    return (
      <div>
        <div className={dark ? 'items itemsDark' : 'items'}>
          <div>
            <h3>{utility_name}</h3>
          </div>
          <div>
            <span>{utility_location}</span>
            <span>Rate: ${utility_rate}/kWh</span>
            <span>Area Pricing: ${utility_ppw}/watt</span>
          </div>
          
          <button className={dark? 'button buttonDark' : 'button'}>Edit Utility</button>
        </div>
      </div>
    )
  }
}



const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Utility)