import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import InternshipHome from './home'
import InternshipUpdate from './update'
import InternshipDetail from './detail'
import './internship.less'

/* 正式员工路由 */
export default class Internship extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/internship' component={InternshipHome} />
        <Route exact path='/internship/update' component={InternshipUpdate} />
        <Route exact path='/internship/detail' component={InternshipDetail} />
        <Redirect to='/internship' />
      </Switch>
    )
  }
}



