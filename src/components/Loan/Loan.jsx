import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Loan extends Component {
  render() {
    console.log(this.props)

    const { loan_name, loan_term, loan_interest } = this.props.loan
    return (
      <div className="items" style={{borderBottom: '1px solid black' }}>
        <div>
          <span>{loan_name}</span>
          <span>Term: {loan_term} years</span>
          <span>Interest Rate: {loan_interest}%</span>
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
