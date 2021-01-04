import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { login } from '../axios'
import { Redirect } from "react-router-dom";

import { Button, Input, Form} from 'antd'
import './Home.css'
import background from '../assets/home.png';
import openDoorBackGround from '../assets/openDoor.png';
function Home() {
  const [loginSuccess, setloginSuccess] = useState(false)  
  const [account, setAccount] = useState("")     
  const [password, setPassword] = useState("")               
  const [warning, setWarning] = useState("");
  const passwordRef = useRef(null);
  const enterRef = useRef(null);

  const handleSubmit = async () => {
   
    const success = await login(account,password);
    console.log(success);

    if (success === 'success') {
      setloginSuccess(true)
      localStorage.setItem("auth", true);
      //window.location = './Management';
    } else {
      setWarning("登入失敗")
      localStorage.setItem("auth", false);
    }
    
    
} 

  const changeImg = (e) => {
    e.target.src= openDoorBackGround;
  }
  // TODO : fill in the rendering contents and logic
  
  return (
    <div className="home">
    <h1>makerspace 門禁管理系統</h1>
    <img className="background-image" src={background} alt="the background of Home page" onClick={changeImg}/>
    </div>
  )
    
}



export default Home;