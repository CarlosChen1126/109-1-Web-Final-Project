import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { login } from '../axios'
import { Redirect } from "react-router-dom";

function ManagerLogin() {
  const [loginSuccess, setloginSuccess] = useState(false)  
  const [account, setAccount] = useState("")     
  const [password, setPassword] = useState("")               
  const [warning, setWarning] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    
    const success = await login(account,password);
    console.log(success);

    if (success === 'success') {
      setloginSuccess(true)
      localStorage.setItem("auth", true);
      window.location = './Management';
    } else {
      setWarning("登入失敗")
      localStorage.setItem("auth", false);
    }
    
    
} 
    
  

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
 
  // TODO : fill in the rendering contents and logic
  return (
    <div id="form-container">
      {!loginSuccess ?
          <React.Fragment>
         <form onSubmit={ handleSubmit }>
         <h2>ManagerLogin</h2>
         <div>
             {'帳號：'}
             <input placeholder="Your Account" name='account' value={account} onChange={handleAccountChange}></input>
         </div>
         <div>
             {'密碼：'}
             <input type="password" placeholder="Your Password" name='password' value={password} onChange={handlePasswordChange}></input>
         </div>
         <div>{warning}</div>
         <input type='submit' value='送出'></input>
       </form>
       </React.Fragment>
       : <React.Fragment><Redirect to="/Management" /></React.Fragment>
      }
    
   
  </div>
  )
}

//export default Question
/*

function ManagerLogin() {
  const handleSubmit=()=>{
    const {
      data:{message, score}
    } = await instance.post('',  {account : ans})
  };
  return (
    <>

    
      <form onSubmit={ handleSubmit }>
        <h2>ManagerLogin</h2>
        <div>
            {'帳號：'}
            <input placeholder="Your Account" name='account'></input>
        </div>
        <div>
            {'密碼：'}
            <input placeholder="Your Password" name='password'></input>
        </div>
        <input type='submit' value='送出'></input>
      </form>
    </>
    
  );
}
*/
export default ManagerLogin;