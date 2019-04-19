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
      laonTerm: '',
      interest: '',
      prePmtFactor: '',
      postPmtFactor: '',
      loans: []
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

  render() {
    return (
      <div>
        <h1>Financial Products</h1>
        <button>Add New Product</button>
        
        {this.state.loans.map(item => {
          return <Loan key={item.loan_id} loan={item}
          loans={this.state.loans}/>
        })}
        
      </div>
    )
  }
}

const mapState = (reduxState) => reduxState

export default connect(mapState, { getData })(LoanProucts)
