import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { generateCode, checkVerifyCode, registerInDatabase } from '../axios';
import { Button } from 'antd';
import { Redirect } from "react-router-dom";


function ValidateMail(props) {
    
  const [varificationCode, setVarificationCode] = useState("");
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [registerInDatabaseSuccess, setRegisterInDatabaseSuccess] = useState('');
  const [warning, setWarning] = useState("");
  const [backToHome, setBackToHome] = useState(false);
  const verifyCodeRef = useRef(null);
  const enterRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log('in handle submit')
    
    const success = await checkVerifyCode(props.email, varificationCode);
     
    if (success === '驗證成功') {
        setVerifySuccess(true);
        const registerSuccess = await registerInDatabase(props.stdID, props.name, props.email);
        if(registerSuccess === '註冊成功'){
            setRegisterInDatabaseSuccess('，已儲存資料')
        }
        else if(registerSuccess === '註冊失敗'){
          setRegisterInDatabaseSuccess('，儲存資料失敗')
        }

    } else if(success === '驗證失敗'){
        setWarning("驗證失敗，請再輸入一次");
    } else{
      setWarning("載入中...")
    }
    
} 
  function validateForm() {
    return varificationCode.length === 6;
  }
  function handleVarificationCodeChange(e){
    setVarificationCode(e.target.value);
  }
  function reGenerateCode(email){
    generateCode(email)
    verifyCodeRef.current.focus()
    setWarning("已重新寄送驗證碼")
  }
  function backToHomePage(){
    console.log('in backToHamePage')
    setBackToHome(true);
    
  }
  useEffect (()=>{
    generateCode(props.email);
    verifyCodeRef.current.focus()
},[])
  if(backToHome){
    return <Redirect to="/" />
  }
  else {
    return (
      <div id="form-container">
          {!verifySuccess?
      <form onSubmit={ handleSubmit }>
        <h2>我們已寄送驗證信至 {props.email}，請輸入六位數驗證碼</h2>
          <div>
              {'驗證碼：'}
              <input ref={verifyCodeRef} placeholder="varification code" name='text' value={varificationCode} onChange={handleVarificationCodeChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  enterRef.current.focus()
                }
              }
            }></input>
          </div>
          <input ref ={enterRef} type='submit' value='送出' disabled={!validateForm()}></input>
          <br/>
          <Button  type="primary" onClick={() => {reGenerateCode(props.email)}}>重新寄送驗證碼</Button>
          <div>{warning}</div>
          
          </form>
          
          : <div>
            <div>驗證通過{registerInDatabaseSuccess}</div>
            <Button onClick={() => {backToHomePage()}}>回到首頁</Button>
            </div>
      }</div>
      
    );
  }
  
}

export default ValidateMail;
//export {verifyResult};