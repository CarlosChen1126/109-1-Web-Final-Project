import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { generateCode, checkVerifyCode, registerInDatabase } from '../axios';



function ValidateMail(props) {
    
  const [varificationCode, setVarificationCode] = useState("");
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [registerInDatabaseSuccess, setRegisterInDatabaseSuccess] = useState('，儲存資料失敗');
  const [warning, setWarning] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    
    const success = await checkVerifyCode(props.email, varificationCode);


    if (success === '驗證成功') {
        setVerifySuccess(true);
        const registerSuccess = await registerInDatabase(props.stdID, props.name, props.email);
        if(registerSuccess === '註冊成功'){
            setRegisterInDatabaseSuccess('，已儲存資料')
        }

    } else {
        setWarning("驗證失敗，請再輸入一次");
    }
    
    
} 
  function validateForm() {
    return varificationCode.length === 6;
  }
  function handleVarificationCodeChange(e){
    setVarificationCode(e.target.value);
  }
  useEffect (()=>{
    generateCode(props.email);
},[])
  return (
    <div id="form-container">
        {!verifySuccess?
    <form onSubmit={ handleSubmit }><h2>我們已寄送驗證信至 {props.email}，請輸入六位數驗證碼</h2>
        <div>
            {'驗證碼：'}
            <input placeholder="varification code" name='text' value={varificationCode} onChange={handleVarificationCodeChange}></input>
        </div>
        <input type='submit' value='送出' disabled={!validateForm()}></input>
        <br/>
        <div>{warning}</div>
        </form>
    
        : <div>驗證通過{registerInDatabaseSuccess}</div>
    }</div>
    
  );
}

export default ValidateMail;