import axios from 'axios';
const API_ROOT = 'https://acs-web-final-project.herokuapp.com/api';
//const API_ROOT = 'http://localhost:5000/api';
const instance = axios.create({
  baseURL: API_ROOT
})


const checkAccountIsExist = async () => {
  const {
      data: {message}
    } = await instance.post('/checkAccountIsExist');
    return await (message);
}
const getManagerAccount = async () => {
  const {
    data: {account: account,
    password: password,
  message: message}
  }= await instance.get('/getManagerAccount');


  
    
  return {account, password, message};

}


const editManagerAccount = async (account, password) => {
  const {
    data: {message: message}
  }=await instance.post('/updateManagerAccount',  {account: account, password: password});

  return message;
  
}

const login = async (account, password) => {
    const {
        data: {message}
      } = await instance.post('/login',  {account: account, password: password});
      return await (message);
}

const registerCheck = async (stdID, name, email) => {
    const {
        data: {
        message: message}
      } = await instance.post('/registerCheck',  {stdID: stdID, name: name, email: email});
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
const getUserTime = async (number) => {
  const{
    data:{
      message:message,
      time:time}
    } = await instance.get('/accesstime',{params:{number}});

    
    if(message==='success'){
      return time;
    }
    else{
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

  const {
      data: {
      message: message,
      err: err
      }
    } = await instance.post('/generateCode',  {email: email});

    return await message;
}

const checkVerifyCode = async (email, verifyCode) => {
  const {
    data: {
    message: message,
    success: success
    }
  } = await instance.post('/checkVerifyCode',  {email: email, verifyCode: verifyCode});
  return await {message:message, success: success};
}

const registerInDatabase = async(stdID, name, email) => {
  const {
    data: {
    message: message}
  } = await instance.post('/registerInDatabase',  {stdID: stdID, name: name, email: email});
  return await message;
}


const getPeople = async() => {
  const {
    data: {message: message,
    onlineResult: onlineResult}
  }= await instance.get('/getOnlinePeople');
  
    
  if(message === 'success'){
    return(onlineResult);
    
  }
  else{ 
      return([""]);
  }

}
const insertAdministrator = async (day,time, name) => {
  const {
    message: message, error: error
  }=await instance.post('/insertAdministrator',  {day: day,time: time, name: name});

  return(message);
}

const getAdministrator = async () => {
  const {
    data: {message: message,
    adminResult: adminResult}
  }= await instance.get('/getAdministrator');


  
    
  if(message === 'success'){
    return(adminResult);
    
  }
  else{ 
      return([""]);
  }

}

const deleteAdministrator = async (day, time, name) => {
  const {
    data: {message: message}
  } = await instance.delete('/deleteAdministrator',{
    data: {
      day: day,
      time: time,
      name: name
    }
  });
  return message;
}

const getEmailAccount = async () => {
  const {
    data: {account: account,
    password: password,
  message: message}
  }= await instance.get('/getEmailAccount');


  
    
  return {account, password, message};

}


const editEmailAccount = async (account, password) => {
  const {
    data: {message: message}
  }=await instance.post('/updateEmailAccount',  {account: account, password: password});

  return message;
  
}
const checkEmailIsExist = async () => {
  const {
      data: {message}
    } = await instance.post('/checkEmailIsExist');
    return await (message);
}

const addManagerAccount = async (account, password) => {
  const {
    data: {message: message}
  }=await instance.post('/addManagerAccount',  {account: account, password: password});

  return message;
  
}

export{ checkAccountIsExist, getManagerAccount, editManagerAccount, login, registerCheck 
  ,getUserData, deleteUserData, updateUserData, generateCode, checkVerifyCode
 ,registerInDatabase,getUserTime, getPeople, insertAdministrator, getAdministrator, deleteAdministrator, getEmailAccount
,checkEmailIsExist, editEmailAccount, addManagerAccount };

