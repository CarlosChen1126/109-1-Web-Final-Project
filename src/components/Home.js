import React from 'react';
import './Home.css'
import titleImg from '../assets/title.png'
import door from '../assets/door.png';

function Home() {

  return (
    <div className="home">
    <img src={titleImg} alt="the title of Home page"/>
    <img className={"background-image", "animation"} src={door} alt="the background of Home page" />
    </div>
  )
    
}

export default Home;