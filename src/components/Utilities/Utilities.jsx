import React, { Component } from 'react'
import Utility from './../Utility/Utility'
import axios from 'axios';
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'


export class Utilities extends Component {
  constructor() {
    super()
    this.state = {
      utilities: []
    }
  }

  componentDidMount() {
    this.getUtilities()
    this.props.getData()
  }



  getUtilities = () => {
    axios.get('/api/utilities').then(res => {
      console.log(res.data)
      this.setState({
        utilities: res.data
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Utility Companies</h1>
        <button>New Utility</button>

        {this.state.utilities.map(item => {
          return <Utility key={item.utility_id} utility={item}
            utilities={this.state.utilities} />
        })}
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Utilities)
