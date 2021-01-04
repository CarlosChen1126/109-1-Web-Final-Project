import React, { useState, useEffect } from 'react'
import Management from './Management';
import Online from './Online';
import {Button} from 'antd';
import { Redirect } from "react-router-dom";
import{
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Manage() {
    const [logoutValue, setLogout] = useState(false);

    const logout = () => {
        localStorage.setItem("auth", false);
        console.log('there');
        setLogout(true);
    }

    if(logoutValue){
        return  <Redirect to="/ManagerLogin" />
      }
    else{
        return  (
            <>
            <Router>
              <div className="nav-wrapper">
                <nav>
                  <ul className="right">
                  <li>
                      <Link to="/Manage/">管理端管理頁面</Link>
                    </li>
                    <li>
                      <Link to="/Manage/Online">在 mks 人員</Link>
                    </li>
                    <li>
                      <Link onClick={logout}>登出</Link>
                    </li>
                    <li>
                      <span>  </span>
                    </li>
                  </ul>
                </nav>
                
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                  <Route exact path="/Manage/">
                    <Management />
                  </Route>
                  <Route path="/Manage/Online">
                    <Online />
                  </Route>
                </Switch>
              </div>
             
            </Router>
            
            </>
          );
    }
  
}



export default Manage;