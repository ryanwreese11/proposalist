import React, { Component } from 'react'
import Utility from './../Utility/Utility'
import axios from 'axios';
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'


export class Utilities extends Component {
  constructor() {
    super()
    this.state = {
      utilities: [],
      utilityName: '',
      utilityRate: '',
      utilityLocation: '',
      utilityPpw: '',
      edit: false
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

  createClick = () => {
    this.setState({
      edit: true
    })
  }

  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  cancelClick = () => {
    this.setState({
      edit: false
    })
  }

  async createUtility() {
    const {utilityName, utilityLocation, utilityRate, utilityPpw} = this.state
     await axios.post('/api/utilities', {utilityName, utilityLocation, utilityRate, utilityPpw})
    .then(this.setState({edit: false}))
    
      await this.getUtilities()
    
  }

  render() {
    return (
      <div>
        <h1>Utility Companies</h1>

        {
          this.state.edit ? (
            <div>
              <div>
                <span>Utility Name:</span>
                <input value={this.state.utilityName} name="utilityName" onChange={this.handleChange}></input>
                <span>Location</span>
                <input value={this.state.utilityLocation} name="utilityLocation" onChange={this.handleChange}></input>
                <span>Rate</span>
                <input value={this.state.utilityRate} name="utilityRate" onChange={this.handleChange}></input>
                <span>Selling PPW</span>
                <input value={this.state.utilityPpw} name="utilityPpw" onChange={this.handleChange}></input>
              </div>
              <div>
                <button onClick={() => this.createUtility()}>Create Utility</button>
                <button onClick={() => this.cancelClick()}>Cancel</button>
              </div>
            </div>
          ) : (
              <div>
                <button onClick={() => this.createClick()}>New Utility</button>

                {
                  this.state.utilities.map(item => {
                    return <Utility key={item.utility_id} utility={item}
                      utilities={this.state.utilities} />
                  })
                }
              </div >


            )
        }
      </div>

    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Utilities)
