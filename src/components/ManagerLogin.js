import React from 'react';
import PropTypes from 'prop-types';




function ManagerLogin() {
  return (
    <>
        <h2>ManagerLogin</h2>
        <div>
            帳號：
            <input placeholder="Your Account"></input>
        </div>
        <div>
            密碼：
            <input placeholder="Your Password"></input>
        </div>
        <button>登入</button>
    </>
    
  );
}

export default ManagerLogin;