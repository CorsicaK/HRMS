import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import RegularHome from './home'
import RegularUpdate from './update'
import RegularDetail from './detail'
import './regular.less'

/* 正式员工路由 */
export default class Regular extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/regular' component={RegularHome} />
        <Route exact path='/regular/update' component={RegularUpdate} />
        <Route exact path='/regular/detail' component={RegularDetail} />
        <Redirect to='/regular' />
      </Switch>
    )
  }
}



