import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getData } from '../../ducks/userReducer'
import Loan from '../Loan/Loan'
import './../LoanProducts/LoanProducts.css'



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
    axios.get(`/api/loans`).then(res => {
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

    await axios.post(`/api/loans`, { loanName, loanTerm, interest, prePmtFactor, postPmtFactor })
      .then(this.setState({ edit: false }))

    await this.getLoans()

  }

  render() {
    const { dark } = this.props.user
    return (
      <div className={dark ? 'itemsWrapper itemsWrapperDark' : "itemsWrapper"}>
        {
          this.state.edit ? (
            <div >
            <h1>Financial Products</h1>
              <div className={dark ? 'create createDark' : 'create'}>
                <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                  <div className='customerInputsWrapper'>
                    <div className='customerInputsWrapper2'>
                      <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                        <span>Financial Product: </span>
                        <span>Loan Term: </span>
                        <span>Interest Rate: </span>
                      </div>

                      <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                        <input className={dark ? 'input inputDark' : 'input'} value={this.state.loanName} name="loanName" onChange={this.handleChange}></input>
                        <input className={dark ? 'input inputDark' : 'input'} value={this.state.loanTerm} name="loanTerm" onChange={this.handleChange}></input>
                        <input className={dark ? 'input inputDark' : 'input'} value={this.state.interest} name="interest" onChange={this.handleChange}></input>
                      </div>
                    </div>
                    <div className='customerInputsWrapper2'>
                      <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                        <span>Payment factor if ITC applied: </span>
                        <span>Payment factor if ITC is NOT applied: </span>
                      </div>

                      <div className={dark ? 'customerInputs customerInputsDark' : 'customerInputs'}>
                        <input className={dark ? 'input inputDark' : 'input'} value={this.state.prePmtFactor} name="prePmtFactor" onChange={this.handleChange}></input>
                        <input className={dark ? 'input inputDark' : 'input'} value={this.state.postPmtFactor} name="postPmtFactor" onChange={this.handleChange}></input>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.createLoan()}>Create Product</button>
                    <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.cancelClick()}>Cancel</button>
                  </div>
                </div>
              </div>
                  <div className='filler'></div>
            </div>
          ) : (
              <div >
                <h1>Financial Products</h1>
                <button className={dark ? 'button buttonDark' : 'button'} onClick={() => this.createClick()}>Add New Product</button>

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
