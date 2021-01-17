import React, { useState, useEffect,useRef } from 'react';
import { registerCheck } from '../axios';
import  ValidateMail  from './ValidateMail';
import './Registrants.css';

function Registrants() {
  const [registerSuccess, setRegisterSuccess] = useState(false)  // true if answered all questions
  const [stdID, setStdID] = useState("");     // to store questions
  const [name, setName] = useState("");               // to record your answers
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState("");
  const stdIDRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const enterRef = useRef(null);

  useEffect (()=>{
    stdIDRef.current.focus()
},[])
  const handleSubmit = async (event) => {
    event.preventDefault();
    const stdIDUpp = stdID.toUpperCase();
    setStdID(stdIDUpp);
    const success = await registerCheck( stdIDUpp, name, email );
    (success === "success") ? setRegisterSuccess(true) : setWarning(success);
    
    
  }

  function validateForm() {
    return stdID.length === 9 && name.length > 0 && email.length > 0;
  }
  

  const handleStdIDChange = (e) => {
    setStdID(e.target.value);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
 
  // TODO : fill in the rendering contents and logic
  return (
    <div >
      {!registerSuccess ?
          <React.Fragment>
         <form onSubmit={ handleSubmit }>
         <h4>使用者註冊</h4>
         <div>
             {'學號：'}
             <input ref={stdIDRef} placeholder="Your stdID" name='stdID' value={stdID} onChange={handleStdIDChange}
             onKeyDown={(e) => {
              if (e.key === 'Enter') {
                nameRef.current.focus()
              }
            }}></input>
         </div>
         <div>
             {'姓名：'}
             <input ref={nameRef} type="text" placeholder="Your Name" name='name' value={name} onChange={handleNameChange}
             onKeyDown={(e) => {
              if (e.key === 'Enter') {
                emailRef.current.focus()
              }
            }}></input>
         </div>
         <div>
             {'信箱：'}
             <input ref={emailRef} type="email" placeholder="Your Email" name='email' value={email} onChange={handleEmailChange}
             onKeyDown={(e) => {
              if (e.key === 'Enter') {
                enterRef.current.focus()
              }
            }}></input>
         </div>
         <div>{warning}</div>
         <input ref={enterRef} type='submit' value='送出' disabled={!validateForm()}></input>
       </form>
       </React.Fragment>
       : <React.Fragment><ValidateMail email= {email} name={name} stdID={stdID}/></React.Fragment>
      }
    
   
  </div>
  )
}
export default Registrants;
