import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import SalaryHome from './home'
import SalaryAddUpdate from './add-update'

/* 员工工资路由 */
export default class Salary extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/salary' component={SalaryHome}/>
        <Route exact path='/salary/addupdate' component={SalaryAddUpdate}/>
        <Redirect to='/salary'/>
      </Switch>
    )
  }
}
