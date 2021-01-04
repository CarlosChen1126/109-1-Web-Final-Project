import axios from 'axios';
const API_ROOT = 'https://acs-web-final-project.herokuapp.com/api';
//const API_ROOT = 'http://localhost:5000/api';
const instance = axios.create({
  baseURL: API_ROOT
})

const login = async (account, password) => {
    const {
        data: {message}
      } = await instance.post('/login',  {account: account, password: password});
      //console.log(message);
      return await (message);
}

const registerCheck = async (stdID, name, email) => {
    const {
        data: {
        message: message}
      } = await instance.post('/registerCheck',  {stdID: stdID, name: name, email: email});
      console.log(message);
      return  await message;
}

const getUserData = async () => {
  const {
    data: {message: message,
    registerResult: registerResult}
  }= await instance.get('/checkusers');


  
    
  if(message === 'success'){
    return(registerResult);
    
  }
  else{ 
      return([""]);
  }

}
const getUserTime=async(number)=>{
  console.log('number',number)
  const{
    data:{
      message:message,
      time:time}
    }=await instance.get('/accesstime',{params:{number}});
    
    if(message==='success'){
      console.log('success')
      return time;
    }
    else{
      console.log('dead')

      return ([""]);
    }
}

const deleteUserData = async (id) => {
  const {
    data: {message: message,
    registerResult: registerResult}
  }=await instance.delete('/delete',{
    headers: {
      Authorization: ""
    },
    data: {
      source: id
    }
  });
  if(message === 'success'){
    return(true);
  }
  else{ 
      return(false);
  }
}

const updateUserData = async (id,stdID, name) => {
  const {
    data: {message: message,
    registerResult: registerResult}
  }=await instance.post('/update',  {id:id,stdID: stdID, name: name});

  if(message === 'success'){
    return(true);
  }
  else{ 
      return(false);
  }
}

const generateCode = async (email) => {
  console.log(email);
  const {
      data: {
      message: message,
      }
    } = await instance.post('/generateCode',  {email: email});
    //console.log(message);
    return  await message;
}

const checkVerifyCode = async (email, verifyCode) => {
  const {
    data: {
    message: message,
    }
  } = await instance.post('/checkVerifyCode',  {email: email, verifyCode: verifyCode});
  console.log(message);
  return await message;
}

const registerInDatabase = async(stdID, name, email) => {
  const {
    data: {
    message: message}
  } = await instance.post('/registerInDatabase',  {stdID: stdID, name: name, email: email});
  console.log(message);
  return await message;
}
export{ login, registerCheck, getUserData, deleteUserData, updateUserData, generateCode, checkVerifyCode
 ,registerInDatabase,getUserTime };

