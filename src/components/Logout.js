import { Redirect } from "react-router-dom";

function logout(){
    localStorage.setItem("auth", false);
    console.log('there');
    return <Redirect to="/ManagerLogin" />
}

export default logout;