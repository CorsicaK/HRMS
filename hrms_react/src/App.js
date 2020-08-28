/* 应用根组件 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
// import Register from './pages/register/register'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
        {/* <Route path='/register' component={Register}></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
