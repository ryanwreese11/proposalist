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
      modules: [],
      modCreate: false,
      invCreate: false,
      modName: '',
      modSize: '',
      invName: '',
      invType: ''

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

  async createModule() {
    const { modName, modSize } = this.state
    axios.post('/api/modules', { modName, modSize })
    .then(this.getModules())
     .then(this.setState({ modCreate: false }))
  }

  async createInverter() {
    const { invName, invType } = this.state
    axios.post('/api/inverters', { invName, invType })
      .then(this.setState({ invCreate: false }))
      .then(this.props.history.push('/equipment'))
  }

  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  modClick = () => {
    this.setState({
      modCreate: true
    })
  }

  invClick = () => {
    this.setState({
      invCreate: true
    })
  }

  cancelClick = () => {
    this.setState({
      modCreate: false,
      invCreate: false
    })
  }




  render() {
    return (
      <div>
        <h1>Equipment</h1>
        {
          this.state.modCreate ? (
            <div>
              <div>
                <h2>New Module</h2>
              </div>
              <div>
                <span>Module Manufacturer</span>
                <input value={this.state.modName} name="modName" placeholder='manufacturer' onChange={this.handleChange}></input>
                <span>Module Size</span>
                <input value={this.state.modSize} name="modSize" placeholder='watts' onChange={this.handleChange}></input>
              </div>
              <div>
                <button onClick={() => this.createModule()}>Create Module</button>
                <button onClick={() => this.cancelClick()}>Cancel</button>
              </div>
            </div>
          ) : this.state.invCreate ? (
            <div>
              <div>
                <h2>New Inverter</h2>
              </div>
              <div>
                <span>Inverter Manufacturer</span>
                <input value={this.state.invName} name="invName" placeholder='manufacturer' onChange={this.handleChange}></input>
                <span>Inverter Type</span>
                <input value={this.state.invType} name="invType" placeholder='type' onChange={this.handleChange}></input>
              </div>
              <div>
                <button onClick={() => this.createInverter()}>Create Inverter</button>
                <button onClick={() => this.cancelClick()}>Cancel</button>
              </div>
            </div>
          ) : (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div >
                    <button onClick={() => this.modClick()}>New Module</button>
                    {this.state.modules.map(item => {
                      return <Modules key={item.mod_id} module={item}
                        modules={this.state.modules} />
                    })}
                  </div>
                  <div>
                    <button onClick={() => this.invClick()}>New Inverter</button>
                    {this.state.inverters.map(item => {
                      return <Inverters key={item.inv_id} inverter={item}
                        inverters={this.state.inverters} />
                    })}
                  </div>
                </div>

              )
        }



      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Equipment)
