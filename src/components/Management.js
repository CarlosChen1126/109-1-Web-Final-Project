import React, { useState } from 'react'
import PropTypes from 'prop-types';




function Management() {
  let data = [{name:"張原",schoolnumber:"b08901049"},{name:"陳宥辰",schoolnumber:"b08901048"}];
  const [display_data, setdisplay_data] = useState([]);
  const handle_search = (style,value) =>{
    if(style==="name"){
      
    }
    else if(style==="schoolnumber"){

    }
    
    alert(style);
    alert(value);

  };
  return (
    <>
      <h2>管理端管理頁面</h2>
      <Search text="學號" onClick={handle_search}/>
      <Search text="姓名" onClick={handle_search}/>


    </>
  );
}

function Search(props) {
  const { text,onClick } = props;
  const [value, setvalue] = useState("");

  const handle_click = ()=>{
    if(text==="學號"){
      onClick("schoolnumber","123")
    }
    else if(text==="姓名"){
      onClick("name","123")
    }
  }
  return (
    <>
      <div>
        {text+"查詢 : "}
        <input type="text"  placeholder={"輸入"+text}/>
        <button onClick={handle_click}>查詢</button>
      </div>
    </>
  );
}


export default Management;