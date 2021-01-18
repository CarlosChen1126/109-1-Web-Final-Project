import React, { useState, useEffect } from 'react'
import Registrants from '../components/Registrants';
import Management from '../components/manage/Management';
import ManagerLogin from '../components/ManagerLogin';
import Home from '../components/Home';
import Administrators from '../components/Administrators';
import ShowPeople from '../components/ShowPeople';
import ShowAdministrator from '../components/ShowAdministrator';
import { getPeople } from '../axios';
import './App.css'
import{
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import homeIcon from '../assets/home.png';
import registerIcon from '../assets/register.png';
import timeIcon from '../assets/time.png';
import loginIcon from '../assets/login.png';

function App() {

  const [people, setPeopleNum] = useState('載入中');
  //const [administrator,setAdministrator] = useState("");
  
  useEffect (()=>{
    localStorage.setItem('auth',false)
    const fetchPeopleNum = async () => {
      const peopleResult = await getPeople();
      setPeopleNum(peopleResult.length + ' 人');
    }
    
    fetchPeopleNum();
    
},[])


   
  return  (
    <>
    <Router>
      <div>
          <ul>
          <li>
              <Link to="/">
                <div className="icon">
                    <img className="icon-img" alt="home" src={homeIcon}/>
                    <div className="hover-hint">首頁</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/Registrants">
              <div className="icon">
                    <img className="icon-img" alt="register" src={registerIcon}/>
                    <div className="hover-hint">使用者註冊</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/Administrators">
              <div className="icon">
                    <img className="icon-img" alt="administrators" src={timeIcon}/>
                    <div className="hover-hint">管理員列表</div>
                </div>
                </Link>
            </li>
            <li>
              <Link to="/ManagerLogin">
              <div className="icon">
                    <img className="icon-img" alt="manager login" src={loginIcon}/>
                    <div className="hover-hint">管理員登入</div>
                </div>
                </Link>
            </li>
            <li>
              <Link to="/ShowPeople">
                mks 人數： {people}
              </Link>
            </li>
            <li>
              <div className="icon">
                現在管理員： <ShowAdministrator/>
              </div>
              
            </li>
          </ul>
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path='/Management'>
            <Management />
          </Route>
          <Route path='/ManagerLogin'>
            <ManagerLogin />
          </Route>
          <Route path="/Registrants">
            <Registrants />
          </Route>
          <Route path="/Administrators">
            <Administrators />
          </Route>
          <Route path="/ShowPeople">
            <ShowPeople />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
     
    </Router>
    
    </>
  );
}



export default App;