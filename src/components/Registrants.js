import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { registerCheck } from '../axios';
import  ValidateMail  from './ValidateMail';


function Registrants() {
  const [registerSuccess, setRegisterSuccess] = useState(false)  // true if answered all questions
  const [stdID, setStdID] = useState("");     // to store questions
  const [name, setName] = useState("");               // to record your answers
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const stdIDUpp = stdID.toUpperCase();
    setStdID(stdIDUpp);
    const success = await registerCheck( stdIDUpp, name, email );
    console.log(success);
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
    <div id="form-container">
      {!registerSuccess ?
          <React.Fragment>
         <form onSubmit={ handleSubmit }>
         <h2>Registrants</h2>
         <div>
             {'學號：'}
             <input placeholder="Your stdID" name='stdID' value={stdID} onChange={handleStdIDChange}></input>
         </div>
         <div>
             {'姓名：'}
             <input type="text" placeholder="Your Name" name='name' value={name} onChange={handleNameChange}></input>
         </div>
         <div>
             {'信箱：'}
             <input type="email" placeholder="Your Email" name='email' value={email} onChange={handleEmailChange}></input>
         </div>
         <div>{warning}</div>
         <input type='submit' value='送出' disabled={!validateForm()}></input>
       </form>
       </React.Fragment>
       : <React.Fragment><ValidateMail email= {email} name={name} stdID={stdID}/></React.Fragment>
      }
    
   
  </div>
  )
}
export default Registrants;
