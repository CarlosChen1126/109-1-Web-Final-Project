import React, { useState, useEffect } from 'react'
import Registrants from '../components/Registrants';
import Management from '../components/manage/Management';
import ManagerLogin from '../components/ManagerLogin';
import Home from '../components/Home';
import Administrators from '../components/Administrators';
import ShowPeople from '../components/showPeople';
import { getPeople } from '../axios';
import{
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  const [people, setPeopleNum] = useState('載入中');
  const [administrator,setAdministrator] = useState("");
  
  useEffect ( async ()=>{
    localStorage.setItem('auth',false)
    const peopleResult = await getPeople();
    console.log(peopleResult.length);
    setPeopleNum(peopleResult.length + ' 人');
    
},[])


   
  return  (
    <>
    <Router>
      <div>
        <nav>
          <ul className="right">
          <li>
              <Link to="/">首頁</Link>
            </li>
            <li>
              <Link to="/Registrants">使用者註冊</Link>
            </li>
            <li>
              <Link to="/Administrators">管理員列表</Link>
            </li>
            <li>
              <Link to="/ManagerLogin">管理員登入</Link>
            </li>
            <li>
            <Link to="/showPeople">mks 人數： {people}</Link>
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
          <Route path="/Registrants">
            <Registrants />
          </Route>
          <Route path="/Administrators">
            <Administrators />
          </Route>
          <Route path="/showPeople">
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