import React, { useState, useEffect } from 'react'
import Registrants from '../components/Registrants';
import Management from '../components/Management';
import ManagerLogin from '../components/ManagerLogin';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  useEffect (()=>{
    localStorage.setItem('auth',false)
},[])
  return (
    <Router>
      <div className="nav-wrapper">
        <nav>
          <ul className="right">
            <li>
              <Link to="/">使用者註冊</Link>
            </li>
            <li>
              <Link to="/ManagerLogin">管理員登入</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path='/Management'>
            <Management />
          </Route>
          <Route path='/ManagerLogin'>
            <ManagerLogin />
          </Route>
          <Route path="/">
            <Registrants />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



export default App;