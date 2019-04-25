import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Loan extends Component {
  render() {
    console.log(this.props)

    const { loan_name, loan_term, loan_interest } = this.props.loan
    return (
      <div style={{borderBottom: '1px solid black' }}>
        <ul>
          <li>{loan_name}</li>
          <li>Term: {loan_term} years</li>
          <li>Interest Rate: {loan_interest}%</li>
        </ul>
        <div>
          <button>Edit</button>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState)(Loan)
