import axios from 'axios';

const API_ROOT = 'http://localhost:5000/api';
const instance = axios.create({
  baseURL: API_ROOT
})

const login = async (account, password) => {
    const {
        data: {message}
      } = await instance.post('/login',  {account: account, password: password});
      //console.log(message);
      if(message === 'successful'){
        return(true);     
      }
      else{ 
          return(false);      
      }
}

const register = async (stdID, name) => {
    const {
        data: {message: message,
        registerResult: registerResult}
      } = await instance.post('/register',  {stdID: stdID, name: name});
      //console.log(message);
      if(message === 'success'){
        return(true);
        
      }
      else{ 
          return(false);
        
      }
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

export{ login, register,getUserData,deleteUserData,updateUserData };

