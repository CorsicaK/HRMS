import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import BasicSalaryHome from './home'



/* 基本工资路由 */
export default class BasicSalary extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/basicSalary' component={BasicSalaryHome} />
        <Redirect to='/basicSalary' />
      </Switch>
    )
  }
}
