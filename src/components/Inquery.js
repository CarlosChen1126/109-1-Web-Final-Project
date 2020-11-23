import React from 'react';
import PropTypes from 'prop-types';




function Inquery() {
  const handleSubmit=()=>{};
  var timeLogin='2';
  var timeLogout='5';
  return (
    <>
        <h2>Inquery</h2>
        <div>
            {'登入時間：'}
            <div>{timeLogin}s</div>
        </div>
        <div>
            {'登出時間：'}
            <div>{timeLogout}s</div>
        </div>
    </>
    
  );
}

export default Inquery;