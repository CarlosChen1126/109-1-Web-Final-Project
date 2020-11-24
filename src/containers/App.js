import React, { useState } from 'react'
import Registrants from '../components/Registrants';
import Management from '../components/Management';
import ManagerLogin from '../components/ManagerLogin';
import Inquery from '../components/Inquery';
import Login from '../components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="nav-wrapper">
        <nav>
          <ul className="right">
            <li>
              <Link to="/">Registrants</Link>
            </li>
            <li>
              <Link to="/Management">Management</Link>
            </li>
            <li>
              <Link to="/ManagerLogin">ManagerLogin</Link>
            </li>
            <li>
              <Link to="/Inquery">Inquery</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Management">
            <Management />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path='/ManagerLogin'>
            <ManagerLogin />
          </Route>
          <Route path='/Inquery'>
            <Inquery />
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
