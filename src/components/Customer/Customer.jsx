import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'




export class Customer extends Component {

  constructor() {
    super()
    this.state = {
      edit: false
    }
  }

  handleEdit = () => {
    this.setState({
      edit: true
    })
  }
  handleCancel = () => {
    this.setState({
      edit: false
    })
  }

  customerView = () => {
    const { cust_email, cust_address, cust_usage, cust_notes, user_appt_date, user_appt_time, utility_name, utility_rate, } = this.props.customer
    const { edit } = this.state
    const multiply = (num1, num2) => {
      // console.log(this.props)
      return Math.floor(num1 * num2)
    }
    return (

      !edit ? (
        <div>
          <button onClick={() => this.handleEdit()}>Customer Details</button>
        </div>
      ) : (


          <div  >
            <div>
              <div>
                <span>Email: {cust_email} </span>
                <span>Address: {cust_address} </span>
              </div>
              <div>
                <span>Utility: {utility_name} </span>
                <span>Annual Usage:{cust_usage} kWh </span>
                <span>Annual Bill: $ {multiply(cust_usage, utility_rate)} </span>
                <span>Notes: {cust_notes} </span>
              </div>
              <div>
                <span>Appt: {user_appt_date} at {user_appt_time}</span>
              </div>
              <div>
                <button onClick={() => this.handleCancel()}>Hide Details</button>
              </div>
            </div>
          </div>)

    )
  }


  render() {
    // console.log(this.props)



    const { cust_progress, cust_id, cust_first_name, cust_last_name, user_first_name, user_last_name } = this.props.customer
    const { rep } = this.props.user


    return (
      rep ? (
        cust_progress === 'New' ? (
          <div className="items">
            <div className="items2">
              <div>
                <h3>{cust_first_name} {cust_last_name}</h3>
              </div>
              <div className="progressButtons">
                <button className="completed">Usage</button>
                <span>></span>
                <button className="inProgress">System</button>
                <span></span>
                <button className="inProgress">Proposal</button>
                <span></span>
                <button className="inProgress">Sold</button>
              </div>
            </div>
            <span>Sales Rep: </span>
            <span>{user_first_name} {user_last_name}</span>
            <div>
              <span >Progress</span>
              <span>{cust_progress}</span>
            </div>
            <div>{this.customerView()}</div>
          </div>

        ) : cust_progress === 'Building Proposal' ?

            (
              <div className="items">
                <div className="items2">
                  <div>
                    <h3>{cust_first_name} {cust_last_name}</h3>
                  </div>
                  <div className="progressButtons">

                    <button className="completed" >Usage</button>

                    <span>></span>

                    <button className="completed"> System</button>

                    <span>></span>
                    <button className="inProgress">Proposal</button>
                    <span></span>
                    <button className="inProgress">Sold</button>
                  </div>

                </div>
                <span>Sales Rep: </span>
                <span>{user_first_name} {user_last_name}</span>
                <div>
                  <span >Progress</span>
                  <span>{cust_progress}</span>
                </div>
                <div>{this.customerView()}</div>
              </div >

            ) : cust_progress === 'Proposal' ?

              (
                <div className="items">
                  <div className="items2">
                    <div>
                      <h3>{cust_first_name} {cust_last_name}</h3>
                    </div>
                    <div className="progressButtons">
                      <button className="completed">Usage</button>
                      <span>></span>
                      <button className="completed">System</button>
                      <span>></span>
                      <Link to={`/proposal/${cust_id}`}>
                        <button className="completed">Proposal</button>
                      </Link>
                      <span>></span>
                      <button className="inProgress">Sold</button>
                    </div>
                  </div>
                  <span>Sales Rep: </span>
                  <span>{user_first_name} {user_last_name}</span>
                  <div>
                    <span >Progress</span>
                    <span>{cust_progress}</span>
                  </div>
                  <div>{this.customerView()}</div>
                </div>

              ) : (
                <div></div>
              )
      ) : (
          cust_progress === 'New' ? (
            <div className="items">
              <div className="items2">
                <div>
                  <h3>{cust_first_name} {cust_last_name}</h3>
                </div>
                <div className="progressButtons">
                  <Link to={`/usage/${cust_id}`}>
                    <button className="completed">Usage</button>
                  </Link>
                  <span>></span>
                  <button className="inProgress">System</button>
                  <span></span>
                  <button className="inProgress">Proposal</button>
                  <span></span>
                  <button className="inProgress">Sold</button>
                </div>
              </div>
              <span>Sales Rep: </span>
              <span>{user_first_name} {user_last_name}</span>
              <div>
                <span >Progress</span>
                <span>{cust_progress}</span>
              </div>
              <div>{this.customerView()}</div>
            </div>

          ) : cust_progress === 'Building Proposal' ?

              (
                <div className="items">
                  <div className="items2">
                    <div>
                      <h3>{cust_first_name} {cust_last_name}</h3>
                    </div>
                    <div className="progressButtons">
                      <Link to={`/usage/${cust_id}`}>
                        <button className="completed" >Usage</button>
                      </Link>
                      <span>></span>
                      <Link to={`/system/${cust_id}`}>
                        <button className="completed"> System</button>
                      </Link>
                      <span>></span>
                      <button className="inProgress">Proposal</button>
                      <span></span>
                      <button className="inProgress">Sold</button>
                    </div>

                  </div>
                  <span>Sales Rep: </span>
                  <span>{user_first_name} {user_last_name}</span>
                  <div>
                    <span >Progress</span>
                    <span>{cust_progress}</span>
                  </div>
                  <div>{this.customerView()}</div>
                </div >

              ) : cust_progress === 'Proposal' ?

                (
                  <div className="items">
                    <div className="items2">
                      <div>
                        <h3>{cust_first_name} {cust_last_name}</h3>
                      </div>
                      <div className="progressButtons">
                        <Link to={`/usage/${cust_id}`}>
                          <button className="completed">Usage</button>
                        </Link>
                        <span>></span>
                        <Link to={`/system/${cust_id}`}>
                          <button className="completed">System</button>
                        </Link>
                        <span>></span>
                        <Link to={`/proposal/${cust_id}`}>
                          <button className="completed">Proposal</button>
                        </Link>
                        <span>></span>
                        <button className="inProgress">Sold</button>
                      </div>
                    </div>
                    <span>Sales Rep: </span>
                    <span>{user_first_name} {user_last_name}</span>
                    <div>
                      <span >Progress</span>
                      <span>{cust_progress}</span>
                    </div>
                    <div>{this.customerView()}</div>
                  </div>

                ) : (
                  <div></div>
                )


        )
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Customer)