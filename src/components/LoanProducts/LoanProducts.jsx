import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getData } from '../../ducks/userReducer'
import Loan from '../Loan/Loan'


export class LoanProucts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loanName: '',
      loanTerm: '',
      interest: '',
      prePmtFactor: '',
      postPmtFactor: '',
      loans: [],
      edit: false
    }

  }

  componentDidMount() {
    this.props.getData()
    this.getLoans()
  }

  getLoans = () => {
    axios.get('/api/loans').then(res => {
      console.log(res.data)
      this.setState({
        loans: res.data
      })
    })
  }

  createClick = () => {
    this.setState({
      edit: true
    })
  }

  cancelClick = () => {
    this.setState({
      edit: false
    })
  }

  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  async createLoan() {
    const { loanName, loanTerm, interest, prePmtFactor, postPmtFactor } = this.state
    await axios.post('/api/loans', { loanName, loanTerm, interest, prePmtFactor, postPmtFactor })
      .then(this.setState({ edit: false }))

    await this.getLoans()

  }

  render() {
    return (
      <div>
        <h1>Financial Products</h1>
        {
          this.state.edit ? (
            <div>
              <div>
                <h3>This is where we edit</h3>
                <span>Financial Product</span>
                <input value={this.state.loanName} name="loanName" onChange={this.handleChange}></input>
                <span>Loan Term</span>
                <input value={this.state.loanTerm} name="loanTerm" onChange={this.handleChange}></input>
                <span>Interest Rate</span>
                <input value={this.state.interest} name="interest" onChange={this.handleChange}></input>
                <span>Payment factor if ITC applied</span>
                <input value={this.state.prePmtFactor} name="prePmtFactor" onChange={this.handleChange}></input>
                <span>Payment factor if ITC is NOT applied</span>
                <input value={this.state.postPmtFactor} name="postPmtFactor" onChange={this.handleChange}></input>
              </div>
              <div>
                <button onClick={() => this.createLoan()}>Create Product</button>
                <button onClick={() => this.cancelClick()}>Cancel</button>
              </div>
            </div>
          ) : (
              <div>
                <button onClick={() => this.createClick()}>Add New Product</button>

                {this.state.loans.map(item => {
                  return <Loan key={item.loan_id} loan={item}
                    loans={this.state.loans} />
                })}
              </div>

            )
        }



      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(LoanProucts)
