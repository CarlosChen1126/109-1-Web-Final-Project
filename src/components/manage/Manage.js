import React, { useState } from 'react'
import Management from './Management';
import Online from './Online';
import SetAdministrator from './SetAdministrator';
import { Redirect } from "react-router-dom";
import{
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Manage.css';
import manageIcon from '../../assets/manage.png';
import onlineIcon from '../../assets/online.png';
import logoutIcon from '../../assets/logout.png';
import administratorIcon from '../../assets/administrator.png';

function Manage() {
    const [logoutValue, setLogout] = useState(false);

    const logout = () => {
        localStorage.setItem("auth", false);
        setLogout(true);
    }

    if(logoutValue){
        return  <Redirect to="/ManagerLogin" />
      }
    else{
        return  (
            <>
            <Router>
              <div>    
              <ul>
                  <li>
                  <Link to="/Manage/">
                    <div className="icon">
                        <img className="icon-img" alt="management" src={manageIcon}/>
                        <div className="hover-hint">管理介面</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/Manage/Online">
                  <div className="icon">
                        <img className="icon-img" alt="online people" src={onlineIcon}/>
                        <div className="hover-hint">在線人員</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/Manage/SetAdministrator">
                  <div className="icon">
                        <img className="icon-img" alt="set administrator" src={administratorIcon}/>
                        <div className="hover-hint">修改管理員</div>
                    </div>
                  </Link>
                </li>
                <li onClick={logout}>
                  <div className="icon">
                          <img className="icon-img" alt="logout" src={logoutIcon}/>
                          <div className="hover-hint">登出</div>
                      </div>
                  
                </li>
             </ul>
                
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                  <Route exact path="/Manage/">
                    <Management />
                  </Route>
                  <Route path="/Manage/Online">
                    <Online />
                  </Route>
                  <Route path="/Manage/SetAdministrator">
                    <SetAdministrator />
                  </Route>
                </Switch>
              </div>
             
            </Router>
            
            </>
          );
    }
  
}



export default Manage;