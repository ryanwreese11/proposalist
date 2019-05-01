import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class User extends Component {


  render() {
    const { user_first_name, user_last_name, user_email, is_admin, is_rep, user_id } = this.props.account
    const { dark } = this.props.user



    console.log(this.props)
    return (
      <div>
        <div className={dark ? 'items itemsDark' : 'items'}>
          <div>
            <h3>{user_first_name} {user_last_name}</h3>
          </div>
          <div>
            <div>
              <span>{user_id}</span>
            </div>
            <span>Email: {user_email}</span>
          <div>
            <span>Account type: 
               {
                is_admin ? (
                  <span> Admin</span>
                ) : is_rep ? (
                  <span> Sales Rep</span>
                ) : (
                      <span> Designer</span>
                    )
              }
            </span>
            </div>

          <button className={dark ? 'button buttonDark' : 'button'}>Edit User</button>
          </div>
        </div>
      </div>
    )
  }
}





const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(User)
