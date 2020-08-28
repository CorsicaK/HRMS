import React, { Component } from 'react'

//判断登录的插件
import memoryUtils from '../../utils/memoryUtils'

import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/'
import Header from '../../components/header/'
import Home from '../home/home'
import Apartment from '../apartment/apartment'
import Staff from '../staff/staff'
import Regular from '../regular/regular'
import Internship from '../internship/internship'
import Retire from '../retire/retire'
import BasicSalary from '../basic-salary/basicSalary'
import HighTempSalary from '../highTemp-salary/highTempSalary'
import TalentSalary from '../talent-salary/talentSalary'
import Pension from '../pension/pension'
import Salary from '../salary/salary'
import Role from '../role/role'
import User from '../user/user'
import NotFound from '../not-found/not-found'

const { Footer, Sider, Content } = Layout;

/* 管理的路由组件 */
export default class Admin extends Component {
  render() {
     const user=memoryUtils.user
     //如果内存中没有存储user==>当前未登录
     if(!user||!user.u_id){
       return <Redirect to='./login'/>
     } 
    
    return (  
        <Layout style={{height:"100vh"}}>
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content style={{margin:20, backgroundColor:"white"}}>
              <Switch>
                <Redirect exact={true} from='/' to='/home'/>
                <Route path='/home' component={Home}></Route>
                <Route path='/apartment' component={Apartment}></Route>
                <Route path='/staff' component={Staff}></Route>
                <Route path='/regular' component={Regular}></Route>
                <Route path='/internship' component={Internship}></Route>
                <Route path='/retire' component={Retire}></Route>
                <Route path='/basicSalary' component={BasicSalary}></Route>
                <Route path='/highTempSalary' component={HighTempSalary}></Route>
                <Route path='/talent' component={TalentSalary}></Route>
                <Route path='/pension' component={Pension}></Route>
                <Route path='/salary' component={Salary}></Route>
                <Route path='/role' component={Role}></Route>
                <Route path='/user' component={User}></Route>
                <Route component={NotFound}></Route>
                
              </Switch>
            </Content>
            <Footer style={{textAlign:"center" ,color:"#ccc",height:"30px"}}>推荐使用谷歌浏览器</Footer>
          </Layout>
        </Layout> 
    )
  }
}
