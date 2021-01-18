import React, {useState, useEffect, useRef} from 'react';
import { login } from '../axios'
import { Redirect } from "react-router-dom";

import './ManagerLogin.css'

function ManagerLogin() {
  const [loginSuccess, setloginSuccess] = useState(false)  
  const [account, setAccount] = useState("")     
  const [password, setPassword] = useState("")               
  const [warning, setWarning] = useState("");
  const accountRef = useRef(null);
  const passwordRef = useRef(null);
  const enterRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(account,password);
    if (success === 'success') {
      setloginSuccess(true)
      localStorage.setItem("auth", true);
    } else {
      setWarning("登入失敗")
      localStorage.setItem("auth", false);
    }
    
    
  }

  function validateForm() {
    return account.length > 0 && password.length > 0;
  }
  useEffect (()=>{
    accountRef.current.focus()
},[]) 
    
  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
 
  // TODO : fill in the rendering contents and logic
  if(loginSuccess){
  return  <Redirect to="/Manage" />
}else{
  return (
    <div>
         <form  onSubmit={handleSubmit}>
         <h4 className="ManagerLogin-title">管理員登入</h4>
         <div>
             {'帳號'}
             <input ref={accountRef} placeholder="管理者帳號" name='account' value={account} style={{ marginBottom: 10 }} onChange={handleAccountChange}
             onKeyDown={(e) => {
              if (e.key === 'Enter') {
                passwordRef.current.focus()
              }
            }}
             ></input>
         </div>
         
         <div>
             {'密碼'}
             <input  ref ={passwordRef} type= "password" placeholder="管理者密碼" name='password' style={{ marginBottom: 10 }} value={password} onChange={handlePasswordChange}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      enterRef.current.click()
                    }
                  }}
            
             ></input>
         </div>
         <div>{warning}</div> 
         <input className="submit-button" ref ={enterRef} type="submit" value="登入" disabled={!validateForm()}/>
       </form>
  </div>
  )
}
  
}



export default ManagerLogin;