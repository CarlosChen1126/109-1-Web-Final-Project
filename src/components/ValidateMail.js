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
    document.getElementById('submit').disabled = "disabled";
    const data = await checkVerifyCode(props.email, varificationCode);
     
    if(data.message === '尚未驗證' ){
      alert('連結資料庫出現問題');
      document.getElementById('regenerate').disabled = false;
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
      document.getElementById('regenerate').disabled = false;
    }else{
     alert('連結伺服器出現問題，請檢查網路連線')
     document.getElementById('regenerate').disabled = false;
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
    document.getElementById('regenerate').disabled = "disabled";
    setTimeout(() =>  {document.getElementById('regenerate').disabled = false;},30000)
    verifyCodeRef.current.focus();
    const message = await generateCode(email);
    if(message === '寄送驗證信成功'){
      const warn = "已重新寄送驗證信，請於 30 秒後再按下重新寄送"
      setWarning(warn);
    }
    
    else if(message === '寄送驗證信失敗'){
      setWarning("")
      alert('重新寄送驗證信失敗')
    }else if(message === '產生驗證碼失敗'){
      setWarning("")
    }
    
  }

  function NewlineText(props) {
    const text = props.text;
    return <div id="newline">{text}</div>;
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
          <input className="design-button" id="submit" ref ={enterRef} type='submit' value='送出' disabled={!validateForm()}></input>
          <br/>
          
          </form>
          <button className="design-button" id="regenerate" type="primary" onClick={() => {reGenerateCode(props.email)}}>重新寄送驗證碼</button>
          <NewlineText text={warning} />
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
