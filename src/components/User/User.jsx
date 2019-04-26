import React, { Component } from 'react'
import { connect } from 'react-redux'

export class User extends Component {


  render() {
    const { user_first_name, user_last_name, user_email, is_admin, is_rep, user_id } = this.props.account




    console.log(this.props)
    return (
      <div>
        <div  className="items" style={{ borderBottom: '1px solid black' }}>
          <div>
            <h3>{user_first_name} {user_last_name}</h3>
          </div>
          <div>
            <span>{user_id}</span>
            <span>Email: {user_email}</span>
            
              <span>Account type:  
              {
                is_admin ? (
                  <span>Admin</span>
                ) : is_rep ? (
                  <span>Sales Rep</span>
                ) : (
                      <span>Designer</span>
                    )
              }
              </span>
            
          </div>
          <button>Edit User</button>
        </div>
      </div>
    )
  }
}





const mapState = (reduxState) => reduxState

export default connect(mapState)(User)
