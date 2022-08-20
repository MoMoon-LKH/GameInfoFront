import axios, {AxiosRequestConfig} from "axios"
import {useCookies} from 'react-cookie'
import { useHistory } from "react-router-dom";
import Cookies from "react-cookie";


export const accessClient = axios.create({
    baseURL: 'https://localhost:443/',
})

accessClient.interceptors.request.use(
    function(config){
        const token = JSON.parse(sessionStorage.getItem("user")).token;
        console.log("interceptor request")
       
        if(token){
            config.headers["Authorization"] = 'Bearer ' + token; 
        }

        return config;
    },
    function(err){
        return Promise.reject(error);
    }
)


accessClient.interceptors.response.use(
    function (response){

        return response;
    },

    async function (err) {

        const history = useHistory();

        try{
            if(err.response.status === 401){
                const access = await axios.post("/api/auth/re-access")
                .then(response => {
                    const data = JSON.parse(sessionStorage.getItem("user"));
                    data.token = response.headers.get("Authorization").replace("Bearer ", "");
                    sessionStorage.setItem("user", JSON.stringify(data));
                    
                    

                    return await axios.request();
                }).catch(err => {
                    const [cookies, , removeCookie] = useCookies(['gameinfo'])
                    sessionStorage.clear();
                    removeCookie("gameinfo");
                    
                // history.push("/login")
                })
            }

        } catch{
           // history.push("/login")
            return Promise.reject(err);
        }
        return Promise.reject(err);
    }

)
    
export default accessClient;