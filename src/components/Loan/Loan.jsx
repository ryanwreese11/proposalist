import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Loan extends Component {
  render() {
    console.log(this.props)

    const { loan_name, loan_term, loan_interest } = this.props.loan
    return (
      <div style={{borderBottom: '1px solid black' }}>
        <div>
          <h2>{loan_name}</h2>
          <h3>Term: {loan_term} years</h3>
          <h3>Interest Rate: {loan_interest}%</h3>
        </div>
        <div>
          <button>Edit</button>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState)(Loan)
