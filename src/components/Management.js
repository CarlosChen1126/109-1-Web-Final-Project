import React, { useState } from 'react'
import PropTypes from 'prop-types';



let data = [{name:"張原",schoolnumber:"b08901049"},{name:"張原嘉",schoolnumber:"b08901049"},{name:"陳宥辰",schoolnumber:"b08901048"}];

function Management() {
  const [display_data, setdisplay_data] = useState([""]);
  const [style, setstyle] = useState("");
  const [value, setvalue] = useState("");

  const handle_search = (style,value) => {
    let display_da = [];
    if(style===""){
      //顯示所有資料
      for (var i = 0; i < data.length; i++) {
        let element = data[i];
        element.index = i;
        display_da.push(element);
      }
      setstyle("");
      setvalue("");
    }
    else{
      for (var i = 0; i < data.length; i++) {
        if(data[i][style]===value){
          let element = data[i];
          element.index = i;
          display_da.push(element);
        }
      }
      setstyle(style);
      setvalue(value);
    }
    setdisplay_data(display_da);
    }
  const handle_revise_delete = (bt_name,revise_value,index) => {
    if(bt_name==="revise"){
      data[index] = revise_value;
    }
    else if(bt_name==="delete"){
      data.splice(index,1);
    }
    handle_search(style,value);
  };
  return (
    <>
      <h2>管理端管理頁面</h2>
      <Search text="學號" onClick={handle_search}/>
      <Search text="姓名" onClick={handle_search}/>
      <button onClick={handle_search}>顯示所有資料</button>
      {display_data[0]==="" ? <div></div> : <Display display_data={display_data} onClick={handle_revise_delete}></Display>}
    </>
  );
  }

function Display(props) {
  const { display_data,onClick } = props;

  if(display_data.length===0){
    return <h4>查無資料QQ</h4>;
  }
  else{
    let dis = display_data.map((obj)=>{
    return <SearchData obj={obj} key={obj.index} onClick={onClick}></SearchData>
  });
    return(
      <>
        <h4>查詢結果:</h4>
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>學號</th>
              <th>更新名字</th>
              <th>更新學號</th>
            </tr>
          </thead>
          <tbody>
            {dis}
          </tbody>
        </table>
      </>
    )
  }
}

function Search(props) {
  const { text,onClick } = props;
  const [value, setvalue] = useState("");

  const handle_click = ()=>{
    if(text==="學號"){
      onClick("schoolnumber",value)
    }
    else if(text==="姓名"){
      onClick("name",value)
    }
    setvalue("");
  }
  return (
    <>
      <div>
        {text+"查詢 : "}
        <input type="text"  placeholder={"輸入"+text} value={value} onChange={(e)=>{setvalue(e.target.value)}}/>
        <button onClick={handle_click}>查詢</button>
      </div>
    </>
  );
}

function SearchData(props){
  const {onClick,obj } = props;
  const [name, setname] = useState("");
  const [schoolnumber, setschoolnumber] = useState("");

  const handle_click = (event)=>{
    if(event.target.name==="revise"){
      if(name==="" && schoolnumber===""){
        onClick(event.target.name,{name:obj.name,schoolnumber:obj.schoolnumber},obj.index);
      }
      else if(name===""){
        onClick(event.target.name,{name:obj.name,schoolnumber:schoolnumber},obj.index);
      }
      else if(schoolnumber===""){
        onClick(event.target.name,{name:name,schoolnumber:obj.schoolnumber},obj.index);
      }
      else{
        onClick(event.target.name,{name:name,schoolnumber:schoolnumber},obj.index);
      }
      setname("");
      setschoolnumber("");
    }
    else if(event.target.name==="delete"){
      onClick(event.target.name,"",obj.index);
    }
  }
  return (
    <>
      <tr>
        <td>{obj.name}</td>
        <td>{obj.schoolnumber}</td>
        <td><input placeholder={obj.name}  value={name} onChange={(e)=>{setname(e.target.value)}}></input></td>
        <td><input placeholder={obj.schoolnumber} value={schoolnumber} onChange={(e)=>{setschoolnumber(e.target.value)}}></input></td>
        <td>
          <button onClick={handle_click} name="revise">修改</button>
          <button onClick={handle_click} name="delete">删除</button>
        </td>
      </tr>
    </>
  );
}

export default Management;