import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import ApartmentHome from './home'
import ApartStaff from './apart-staff'

/* 部门信息路由 */
export default class Apartment extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/apartment' component={ApartmentHome}/>
        <Route exact path='/apartment/apartStaff' component={ApartStaff}/>
        <Redirect to='/apartment'/>
      </Switch>
    )
  }
}