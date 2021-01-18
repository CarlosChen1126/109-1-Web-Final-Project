import React, {useState, useEffect, useRef} from 'react';
import { getEmailAccount, editEmailAccount } from '../../axios';


import './Settings.css'

function Settings() { 
  const [account, setAccount] = useState("")     
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [oldAccount, setOldAccount] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [firstEntry, setFirstEntry] = useState(true);               
  const accountRef = useRef(null);
  const passwordRef = useRef(null);
  const enterRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning('修改中...');
    const data = await editEmailAccount(account, password);
    if(data === 'success'){
        alert('修改成功');
        setWarning('');
        const dataEmail =  await getEmailAccount();
        if(dataEmail){
            setOldAccount(dataEmail.account);
            setOldPassword(dataEmail.password);
            setAccount(dataEmail.account);
            setPassword(dataEmail.password);
        }
    }else{
      alert('修改失敗');
      setWarning('');
    }
    
  }

  const validateForm = () => {
    
    
    if(account.length === 0 || password.length === 0){
        return false;
    }
    else if(account === oldAccount && password === oldPassword){
        return(false);
    }
    else return true;  
  }
 
  useEffect (()=>{
    
        accountRef.current.focus()
    async function getEmail(){
    if(firstEntry){
        const data =  await getEmailAccount();
        if(data){
            setOldAccount(data.account);
            setOldPassword(data.password);
            setAccount(data.account);
            setPassword(data.password);
        }
        
        setFirstEntry(false);
        
    }
    
    
    }
    
    getEmail();    
},[]); 
    
  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
 
  // TODO : fill in the rendering contents and logic
  
  return (
    <div>
         <form  onSubmit={handleSubmit}>
         <h4>信箱帳密更改</h4>
         <div>
             {'信箱帳號'}
             <input ref={accountRef} placeholder="信箱帳號" name='email' value={account} style={{ marginBottom: 10 }} onChange={handleAccountChange}
             onKeyDown={(e) => {
              if (e.key === 'Enter') {
                passwordRef.current.focus()
              }
            }}
             ></input>
         </div>
         
         <div>
             {'信箱密碼'}
             <input  ref={passwordRef} type="password" placeholder="新密碼" name='password' value={password} onChange={handlePasswordChange}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      enterRef.current.click()
                    }
                  }}
            
             ></input>
         </div>
         <div>{warning}</div>
         <input className="submit-button" ref ={enterRef} type="submit" value="修改" disabled={!validateForm()}/>
         
       </form>
  </div>
  )
}
  




export default Settings;