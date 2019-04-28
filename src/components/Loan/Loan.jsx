import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from './../../ducks/userReducer'

export class Loan extends Component {

  componentDidMount() {
    this.props.getData()
  }

  render() {
    console.log(this.props)

    const { loan_name, loan_term, loan_interest } = this.props.loan
    const { dark } = this.props.user
    return (
      <div className={dark ? 'items itemsDark' : 'items'}>
        <div >
          <div>
            <div>
              <span>{loan_name}</span>
            </div>
            <div>
              <span>Term: {loan_term} years</span>
            </div>
            <div>
              <span>Interest Rate: {loan_interest}%</span>
            </div>
          </div>
          <div>
            <button className={dark? 'button buttonDark' : 'button'}>Edit</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(Loan)
