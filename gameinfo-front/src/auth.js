import axios from "axios"


const LogoutFunc = () => {
 
    return axios.post("/api/user/logout")
    .then(res => {
        localStorage.clear();

        return res.data; 
    })
    .catch(error => {

        return error;
    })
}

const LoginFunc = (props) =>{


   
    
}


export default {LogoutFunc, LoginFunc};