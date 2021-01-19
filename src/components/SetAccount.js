import React, {useState, useEffect, useRef} from 'react';
import { getEmailAccount, addManagerAccount } from '../axios';


import './SetAccount.css'

function SetAccount() { 
  const [account, setAccount] = useState("")     
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");              
  const accountRef = useRef(null);
  const passwordRef = useRef(null);
  const enterRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning('新增中...');
    const data = await addManagerAccount(account, password);
    if(data === '新增管理員帳密成功'){
        alert('新增成功');
        setWarning('');
        window.location.reload();
    }else if(data === '新增管理員帳密失敗'){
      alert('新增失敗');
      setWarning('');
       window.location.reload();
    }
    
  }

  const validateForm = () => {
    
    
    if(account.length === 0 || password.length === 0){
        return false;
    }
    
    else return true;  
  }
 
  useEffect (()=>{
    
    accountRef.current.focus()
    
      
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
         <h4>新增管理員帳密</h4>
         <div>
             {'管理員帳號'}
             <input ref={accountRef} placeholder="信箱帳號" name='email' value={account} style={{ marginBottom: 10 }} onChange={handleAccountChange}
             onKeyDown={(e) => {
              if (e.key === 'Enter') {
                passwordRef.current.focus()
              }
            }}
             ></input>
         </div>
         
         <div>
             {'管理員密碼'}
             <input  ref={passwordRef} type="password" placeholder="新密碼" name='password' value={password} onChange={handlePasswordChange}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      enterRef.current.click()
                    }
                  }}
            
             ></input>
         </div>
         <div>{warning}</div>
         <input className="submit-button" ref ={enterRef} type="submit" value="新增" disabled={!validateForm()}/>
         
       </form>
  </div>
  )
}
  




export default SetAccount;