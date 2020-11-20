import React, { useState } from 'react'
import Registrants from '../components/Registrants';
import Management from '../components/Management';
import ManagerLogin from '../components/ManagerLogin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Registrants</Link>
            </li>
            <li>
              <Link to="/Management">Management</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/ManagerLogin">ManagerLogin</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Management">
            <Management />
          </Route>
          <Route path="/users">
            <Users />
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



function Users() {
  return <h2>Users</h2>;
}

export default App;
