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

export{ login, register };

