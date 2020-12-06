import { Redirect } from "react-router-dom";

function logout(){
    localStorage.setItem("auth", false);
    window.location = "/ManagerLogin";
}

export default logout;