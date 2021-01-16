import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { login } from '../axios'
import { Redirect } from "react-router-dom";

import './ManagerLogin.css'
import { Button, Input, Form} from 'antd'

function ManagerLogin() {
  const [loginSuccess, setloginSuccess] = useState(false)  
  const [account, setAccount] = useState("")     
  const [password, setPassword] = useState("")               
  const [warning, setWarning] = useState("");
  const accountRef = useRef(null);
  const passwordRef = useRef(null);
  const enterRef = useRef(null);

  const handleSubmit = async () => {
    
    const success = await login(account,password);
    console.log(success);

    

    if (success === 'success') {
      setloginSuccess(true)
      localStorage.setItem("auth", true);
      //window.location = './Management';
    } else {
      setWarning("登入失敗")
      localStorage.setItem("auth", false);
    }
    
    
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
    <div id="form-container">
          <React.Fragment>
         <Form onSubmit={ handleSubmit }>
         <h2 className="ManagerLogin-title">管理員登入</h2>
         <div>
             {'帳號：'}
             <Input ref={accountRef} placeholder="Your Account" name='account' value={account} style={{ marginBottom: 10 }} onChange={handleAccountChange}
             onKeyDown={(e) => {
              if (e.key === 'Enter') {
                passwordRef.current.focus()
              }
            }}
             ></Input>
         </div>
         
         <div>
             {'密碼：'}
             <Input  ref ={passwordRef} type="password" placeholder="Your Password" name='password' value={password} onChange={handlePasswordChange}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      enterRef.current.click()
                    }
                  }}
            
             ></Input>
         </div>
         <div>{warning}</div>
         <div className="button">
         <Button ref ={enterRef} type="primary" onClick={() => handleSubmit()}>送出</Button>
         </div>
       </Form>
       </React.Fragment>   
  </div>
  )
}
  
}



export default ManagerLogin;