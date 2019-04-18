import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Dashboard from './components/Dashboard/Dashboard'
import Customer from './components/Customer/Customer'
import Usage from './components/Usage/Usage'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import CreateCustomer from './components/CreateCustomer/CreateCustomer'
import Utilities from './components/Utilities/Utilities'
import Equipment from './components/Equipment/Equipment'



export default (
  <Switch>
    <Route path='/' exact component={Dashboard}/>
    <Route path='/customer' component={Customer}/>
    <Route path='/usage' component={Usage}/>
    <Route path='/login' component={Login}/>
    <Route path='/register' component={Register}/>
    <Route path='/newcust' component={CreateCustomer}/>
    <Route path='/utilities' component={Utilities}/>
    <Route path='/equipment' component={Equipment}/>
  </Switch>
)