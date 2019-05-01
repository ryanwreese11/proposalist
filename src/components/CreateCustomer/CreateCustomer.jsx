import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getData } from './../../ducks/userReducer'
import { connect } from 'react-redux'
import '../CreateCustomer/CreateCustomer.css'


// import { Link } from 'react-router-dom'

export class CreateCustomer extends Component {
  constructor(props) {
    super(props)

    this.state = {

      utilities: [],
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      utility: '',
      notes: '',
      apptDate: '',
      apptTime: '',
      custProgress: 'New'
    }
  }

  componentDidMount() {
    this.getUtilities()
  }

  newCust = () => {
    const { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress } = this.state
    axios.post(`/api/customers`, { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress }).then(res => {
      // console.log(res.data)
    }
    )
  }

  getUtilities = () => {
    axios.get(`/api/utilities`).then(res => {
      // console.log(res.data)
      this.setState({
        utilities: res.data
      })
    })
  }



  render() {
    const { dark } = this.props.user
    let mappedUtilities = this.state.utilities.map((utility, i) => {
      return <option key={i}>{`${utility.utility_name}`}</option>
    })
    return (
      <div className={this.props.user.dark ? 'itemsWrapper itemsWrapperDark' : "itemsWrapper"}>
        <div>
          <h1>Create Customer</h1>
        </div>
        <div className={dark ? 'create createDark' : 'create'} >
          <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
            <div className='customerInputsWrapper'>
              <div className='customerInputsWrapper2'>
                <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                  <span>First Name:</span>
                  <span>Last Name:</span>
                  <span>Email:</span>
                  <span>Address:</span>
                </div>
                <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                  <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ firstName: e.target.value })} value={this.state.firstName} type='text'></input>
                  <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ lastName: e.target.value })} value={this.state.lastName} type='text'></input>
                  <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type='text'></input>
                  <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ address: e.target.value })} value={this.state.address} type='text'></input>
                </div>
              </div>
              <div className='customerInputsWrapper2'>
                <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                  <span>Utility: </span>
                  <span>Notes:</span>
                  <span>Appt Date: </span>
                  <span>Time: </span>
                </div>
                <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                  <select className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ utility: e.target.value })} value={this.state.utility}>
                    <option disabled></option>
                    {mappedUtilities}
                  </select>
                  <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ notes: e.target.value })} value={this.state.notes} type='text'></input>
                  <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ apptDate: e.target.value })} value={this.state.apptDate} type="date"></input>
                  <input className={dark ? 'input inputDark' : 'input'} onChange={(e) => this.setState({ apptTime: e.target.value })} value={this.state.apptTime} type="time"></input>
                </div>
              </div>
            </div>
            <div>
              <Link to='/'>
                <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.newCust()}>Create Customer</button>
              </Link>
              <Link to='/'>
              <button className={dark ? 'button buttonDark' : 'button'}>Cancel</button>
              </Link>
            </div>
          </div>
        </div>
        <div className='filler'></div>

      </div>

    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(CreateCustomer)







