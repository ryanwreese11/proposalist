import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'
import { Link } from 'react-router-dom'
import axios from 'axios';




export class Usage extends Component {

  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      utility: '',
      usage: '',
      utilityRate: '',
      custProgress: '',
      edit: false
    }
  }

  componentDidMount = async () => {
    await this.props.getData()
    console.log(this.props)

    await this.getCustomer()

  }

  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  edit = () => {
    this.setState({
      edit: true
    })
  }

  cancel = () => {
    this.setState({
      edit: false
    })
  }




  async getCustomer() {
    // const cust_id = this.props.match.params.id;
    await axios.get(`/api/usage/${this.props.match.params.cust_id}`).then(res => {
      this.setState({
        firstName: res.data[0].cust_first_name,
        lastName: res.data[0].cust_last_name,
        utility: res.data[0].utility_name,
        usage: res.data[0].cust_usage,
        utilityRate: res.data[0].utility_rate,
        custProgress: res.data[0].cust_progress

      })

      console.log(res.data[0])
    }).catch(err => {
    })
  }

  async updateCustomer() {
    const { usage } = this.state
    const { cust_id } = this.props.match.params
    let reqBody = { cust_id, usage, custProgress: 'Building Proposal' }
    await axios.put(`/api/usage/${this.props.match.params.cust_id}`, reqBody).then(res => {
      console.log(res.data[0])
      this.setState = ({
        usage: res.data[0].cust_usage,
        custProgress: res.data[0].cust_progress
      })
    })

  }

  deleteCustomer = (id) => {
    axios.delete(`/api/customers/${this.props.match.params.cust_id}`, id).then(res => {

      

    }).catch(err => console.log('there was an error.', err))

  }



  render() {
    const { dark } = this.props.user
    const multiply = (num1, num2) => {
      return Math.floor(num1 * num2)
    }
    return (
      <div className={dark ? 'itemsWrapper itemsWrapperDark' : "itemsWrapper"}>
        <h2>Usage</h2>

        {
          !this.state.edit ? (


            <div className={dark ? 'items itemsDark' : "items"}>
              <div>
                <h1>{this.state.firstName} {this.state.lastName}</h1>
              </div>
              <div>
                <span>Status: {this.state.custProgress}</span>
              </div>
              <div>
                <span>Utility: {this.state.utility}</span>
              </div>
              <div>
                <span>Current Annual Usage: {this.state.usage} kWh </span>
              </div>
              <div>
                <span>Current Annual Bill: ${multiply(this.state.usage, this.state.utilityRate)}</span>
              </div>
              <div>
                <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.edit()}>Edit</button>
                <Link to={`/system/${this.props.match.params.cust_id}`}>
                  <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.updateCustomer()}>Next Step</button>
                </Link>
              </div>
            </div>
          ) : (
              <div className={dark ? 'items itemsDark' : "items"}>
                <div>
                  <h1>{this.state.firstName} {this.state.lastName} {this.state.custProgress}</h1>
                </div>
                <div>
                  <span>Utility: {this.state.utility}</span>
                </div>
                <div>
                  <span>Current Annual Usage: </span>
                  <input className={dark ? 'input inputDark' : 'input'} name="usage" onChange={this.handleChange} ></input> kWh
                </div>
                <div>
                  <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.cancel()}>Save ></button>
                  <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.cancel()}>Cancel </button>
                  
                    <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.deleteCustomer()}>Delete Customer </button>
                  
                </div>

              </div>

            )
        }
        <div className='filler'></div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Usage)
