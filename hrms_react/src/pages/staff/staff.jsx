import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import StaffHome from './home'
import StaffAddUpdate from './add-update'
import StaffDetail from './detail'
import './staff.less'

/* 员工花名册路由 */
export default class Staff extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/staff' component={StaffHome}/>
        <Route exact path='/staff/addupdate' component={StaffAddUpdate}/>
        <Route exact path='/staff/detail' component={StaffDetail}/>
        <Redirect to='/staff'/>
      </Switch>
    )
  }
}
