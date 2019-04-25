import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './components/Dashboard/Dashboard'
import Customer from './components/Customer/Customer'
import Usage from './components/Usage/Usage'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import CreateCustomer from './components/CreateCustomer/CreateCustomer'
import Utilities from './components/Utilities/Utilities'
import Equipment from './components/Equipment/Equipment'
import LoanProducts from './components/LoanProducts/LoanProducts'
import Proposal from './components/Proposal/Proposal'
import System from './components/System/System'
import ProposalView from './components/ProposalView/ProposalView'



export default (
  <Switch>
    <Route path='/' exact component={Dashboard} />
    <Route path='/customer' component={Customer} />
    <Route path='/usage/:cust_id' component={Usage} />
    <Route path='/proposal/:cust_id' component={Proposal} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/newcust' component={CreateCustomer} />
    <Route path='/utilities' component={Utilities} />
    <Route path='/equipment' component={Equipment} />
    <Route path='/loans' component={LoanProducts} />
    <Route path='/system/:cust_id' component={System} />
    <Route path='/proposalview/:prop_id' component={ProposalView} />
  </Switch>
)