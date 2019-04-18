import React, { Component } from 'react'
import { connect } from 'react-redux'

export class User extends Component {
  render() {

    const { user_first_name, user_last_name, user_email, is_admin, is_rep, user_id } = this.props.account
    return (
      <div>
        <div style={{borderBottom: '1px solid black' }}>
          <div>
            <h3>{user_first_name} {user_last_name}</h3>
            <span>{user_id}</span>
          </div>
          <span>Email: {user_email}</span>
          <div>
            <span>Account type: </span>
            {
              is_admin ? (
                <span>Admin</span>
              ) : is_rep ? (
                <span>Sales Rep</span>
              ) : (
                    <span>Designer</span>
                  )
            }
          </div>
          <button>Edit User</button>
          <button>Delete User</button>
        </div>
      </div>
    )
  }
}





const mapState = (reduxState) => reduxState

export default connect(mapState)(User)
