import axios from "axios"




const logoutFunc = () => {
 
    return axios.post("/api/user/logout")
    .then(res => {
        localStorage.removeItem("user");

        return res.data; 
    })
    .catch(error => {

        return error;
    })
}

const loginFunc = (props) =>{


    const header = {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }

    axios.post("/api/auth/login", props.inputs, header)
    .then(res => {
        
        const data = {
            "id": res.data.id,
            "nickname": res.data.nickname,
            "totken": res.data.accessToken
        }

        localStorage.setItem("user", data)


        axios.defaults.headers.common[
            "Authorization"  
        ] = 'Bearer ' + res.data.accessToken;

        return true;
    })
    .catch(e =>{
        return false;
    })
}


export default {logoutFunc, loginFunc};