import React, { useState, useEffect, useRef } from 'react';
import { generateCode, checkVerifyCode, registerInDatabase } from '../axios';
import { Redirect } from "react-router-dom";
import './ValidateMail.css';


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
    
    const data = await checkVerifyCode(props.email, varificationCode);
     
    if(data.message === '尚未驗證' ){
      alert('連結資料庫出現問題');
    }else if (data.success === '驗證成功') {
        setVerifySuccess(true);
        const registerSuccess = await registerInDatabase(props.stdID, props.name, props.email);
        if(registerSuccess === '註冊成功'){
            setRegisterInDatabaseSuccess('，已儲存資料，將於 3 秒後回到首頁')
            setTimeout(() => {
              backToHomePage()
            }, 3000);
        }
        else {
          setRegisterInDatabaseSuccess('，儲存資料失敗，將於 3 秒後回到首頁')
          setTimeout(() => {
            backToHomePage()
          }, 3000);
        }
    }else if(data.success === '驗證失敗'){
      setWarning("驗證失敗，請再輸入一次");
    }else{
     alert('連結伺服器出現問題，請檢查網路連線')
    }
    
} 
  function validateForm() {
    return varificationCode.length === 6;
  }
  function handleVarificationCodeChange(e){
    setVarificationCode(e.target.value);
  }
  async function reGenerateCode(email){
    setWarning("驗證信重新寄送中...")
    verifyCodeRef.current.focus();
    const message = await generateCode(email);
    if(message === '寄送驗證信成功')
    setWarning("已重新寄送驗證信")
    else if(message === '寄送驗證信失敗'){
      setWarning("")
      alert('重新寄送驗證信失敗')
    }else if(message === '產生驗證碼失敗'){
      setWarning("")
      alert('重新產生驗證碼失敗')
    }
    
  }
  function backToHomePage(){
    setBackToHome(true);
    
  }
  useEffect (()=>{
    
    verifyCodeRef.current.focus()
},[])
  if(backToHome){
    return <Redirect to="/" />
  }
  else {
    return (
      <div>
          {!verifySuccess?
          <div className="form-container">
      <form onSubmit={ handleSubmit }>
        <h4>我們已寄送驗證信至 {props.email}<br/>請輸入六位數驗證碼</h4>
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
          <input className="design-button" ref ={enterRef} type='submit' value='送出' disabled={!validateForm()}></input>
          <br/>
          
          </form>
          <button className="design-button" type="primary" onClick={() => {reGenerateCode(props.email)}}>重新寄送驗證碼</button>
          <div>{warning}</div>
          </div>
          : <div className="pass-page">
            <div>驗證通過{registerInDatabaseSuccess}</div>
            <button className="design-button" onClick={() => {backToHomePage()}}>回到首頁</button>
            </div>
      }</div>
      
    );
  }
  
}

export default ValidateMail;
//export {verifyResult};