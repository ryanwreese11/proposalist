import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
import Inverters from './Inverters'
import Modules from './Modules'

export class Equipment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inverters: [],
      modules: []

    }
  }

  componentDidMount() {
    this.props.getData()
    this.getModules()
    this.getInverters()
  }

  getModules = () => {
    axios.get('/api/modules').then(res => {
      console.log(res.data)
      this.setState({
        modules: res.data
      })
    })
  }

  getInverters = () => {
    axios.get('/api/inverters').then(res => {
      console.log(res.data)
      this.setState({
        inverters: res.data
      })
    })
  }


  render() {
    return (
      <div>
        <h1>Equipment</h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <div >
            {this.state.modules.map(item => {
              return <Modules key={item.mod_id} module={item}
                modules={this.state.modules} />
            })}
          </div>
          <div>
            {this.state.inverters.map(item => {
              return <Inverters key={item.inv_id} inverter={item}
                inverters={this.state.inverters} />
            })}
          </div>
        </div>




      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Equipment)
