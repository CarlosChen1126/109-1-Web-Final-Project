import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { login } from '../axios'
import { Redirect } from "react-router-dom";

import { Button, Input, Form} from 'antd'
import './Home.css'
import titleImg from '../assets/title.png'
import door from '../assets/door.png';

function Home() {
/*
  const changeImg = (e) => {
    e.target.src= openDoorBackGround;
  }
  */
  
  return (
    <div className="home">
    <img src={titleImg} alt="the title of Home page"/>
    <img className="background-image" src={door} alt="the background of Home page" />
    </div>
  )
    
}



export default Home;