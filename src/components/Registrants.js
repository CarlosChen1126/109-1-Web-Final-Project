import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { register } from '../axios'


function Registrants() {
  const [registerSuccess, setRegisterSuccess] = useState(false)  // true if answered all questions
  const [stdID, setStdID] = useState("")     // to store questions
  const [name, setName] = useState("")               // to record your answers
  const [warning, setWarning] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    register( stdID, name ) ? setRegisterSuccess(true) : setWarning("登入失敗");
  }
  

  const handleStdIDChange = (e) => {
    setStdID(e.target.value);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
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
         <div>{warning}</div>
         <input type='submit' value='送出'></input>
       </form>
       </React.Fragment>
       : <React.Fragment>註冊成功</React.Fragment>
      }
    
   
  </div>
  )
}
export default Registrants;
