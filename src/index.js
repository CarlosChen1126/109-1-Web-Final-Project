import React from 'react';
import ReactDOM from 'react-dom';

import { MemoryRouter } from 'react-router'
import './styles.css';
import App from './containers/App';
import Management from './components/Management';
import Registrants from './components/Registrants';
import { Route, Redirect } from 'react-router-dom';

import { BrowserRouter, Switch } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    return(
      <Route {...rest} render={(props) => {
  
        let auth = localStorage.getItem('auth')
        console.log(auth);
        if(auth === "true"){
          return <Component {...props} />
          
        }else{
          return <Redirect to="/ManagerLogin" />
        }
      }} />
      
    )
    }
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={App} />
      <PrivateRoute path="/Management" component={Management} />
      <App/>
      </Switch>
    </BrowserRouter>
    ,
    document.getElementById('root')
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  //serviceWorker.unregister();
  
// eslint
//ReactDOM.render(<App />, document.getElementById('root'));
