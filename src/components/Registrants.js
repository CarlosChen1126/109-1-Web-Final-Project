import React from 'react';
import PropTypes from 'prop-types';




function Registrants() {
  const handleSubmit = ()=>{};
  return(
    <form onSubmit="handleSubmit">
      <h2>註冊使用者頁面</h2>
      <div>
        {"學號 : "}
        <input type="text" name="schoolnumber" placeholder="你的學號"/>
      </div>
      <div>
        {"姓名 : "}
        <input type="text" name="name" placeholder="你的姓名"/>
      </div>
      <div><input type="submit" value="送出"/></div>
    </form>
  )

}

export default Registrants;
