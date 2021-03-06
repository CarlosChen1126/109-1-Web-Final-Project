import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Manage from './components/manage/Manage';
import { Route, Redirect } from 'react-router-dom';

import { HashRouter as Router, Switch } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    return(
      <Route {...rest} render={(props) => {
  
        let auth = localStorage.getItem('auth')
        if(auth === "true"){
          return <Component {...props} />
          
        }else{
          return <Redirect to="/ManagerLogin" />
        }
      }} />
      
    )
    }
  ReactDOM.render(
    <Router>
      <Switch>
      <Route exact path="/" component={App} />
      <PrivateRoute path="/Manage" component={Manage} />
      <App/>
      </Switch>
    </Router>
    ,
    document.getElementById('root')
  );
  

