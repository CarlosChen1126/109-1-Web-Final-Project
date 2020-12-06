import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { getUserData,deleteUserData,updateUserData } from '../axios'
import logout from './Logout'



//let data = [{name:"張原",stdID:"b08901049"},{name:"張原嘉",stdID:"b08901049"},{name:"陳宥辰",stdID:"b08901048"}];

function Management() {
  const [data, setdata] = useState([]);
  const [display_data, setdisplay_data] = useState([""]);
  const [style, setstyle] = useState("");
  const [value, setvalue] = useState("");

  //跟DB要資料
  useEffect(() => {
    let isUnmount = false;
    if(!data.length&&!isUnmount){
       getUserData().then(result=>setdata(result))
    }
    if(display_data[0]!==""){
      handle_search(style,value)
    }
    return () => isUnmount = true;
  },[data])

  //處理查詢
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

  //修改跟刪除
  const handle_revise_delete = async (bt_name,revise_value,index) => {
    if(bt_name==="revise"){
      updateUserData(data[index]._id,revise_value.stdID,revise_value.name)
      let list = [...data];
      list[index] = revise_value;
      setdata(list);
    }
    else if(bt_name==="delete"){
      const msg = await deleteUserData(data[index]._id)
      if (msg){
        let list = [...data];
        list.splice(index,1);
        setdata(list);
      }
    }
  };
  return (
    <>
      <h2>管理端管理頁面</h2>
      <Search text="學號" onClick={handle_search}/>
      <Search text="姓名" onClick={handle_search}/>
      <button onClick={handle_search}>顯示所有資料</button>
      <br/>
      <button onClick={logout}>登出</button>
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
      onClick("stdID",value)
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
  const [stdID, setstdID] = useState("");

  const handle_click = (event)=>{
    if(event.target.name==="revise"){
      if(name==="" && stdID===""){
        onClick(event.target.name,{name:obj.name,stdID:obj.stdID},obj.index);
      }
      else if(name===""){
        onClick(event.target.name,{name:obj.name,stdID:stdID},obj.index);
      }
      else if(stdID===""){
        onClick(event.target.name,{name:name,stdID:obj.stdID},obj.index);
      }
      else{
        onClick(event.target.name,{name:name,stdID:stdID},obj.index);
      }
      setname("");
      setstdID("");
    }
    else if(event.target.name==="delete"){
      onClick(event.target.name,"",obj.index);
    }
  }
  return (
    <>
      <tr>
        <td>{obj.name}</td>
        <td>{obj.stdID}</td>
        <td><input placeholder={obj.name}  value={name} onChange={(e)=>{setname(e.target.value)}}></input></td>
        <td><input placeholder={obj.stdID} value={stdID} onChange={(e)=>{setstdID(e.target.value)}}></input></td>
        <td>
          <button onClick={handle_click} name="revise">修改</button>
          <button onClick={handle_click} name="delete">删除</button>
        </td>
      </tr>
    </>
  );
}

export default Management;