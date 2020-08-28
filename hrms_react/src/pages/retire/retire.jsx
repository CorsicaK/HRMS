import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import RetireHome from './home'
import RetireUpdate from './update'
import RetireDetail from './detail'
import './retire.less'

/* 退休员工路由 */
export default class Retire extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/retire' component={RetireHome} />
        <Route exact path='/retire/update' component={RetireUpdate} />
        <Route exact path='/retire/detail' component={RetireDetail} />
        <Redirect to='/retire' />
      </Switch>
    )
  }
}



