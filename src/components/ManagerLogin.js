import React from 'react';
import PropTypes from 'prop-types';






function ManagerLogin() {
  const handleSubmit=()=>{};
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

export default ManagerLogin;