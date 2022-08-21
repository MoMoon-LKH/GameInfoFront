import axios, {AxiosRequestConfig} from "axios"
import { useState } from "react";


export const accessClient = axios.create({
    baseURL: 'https://localhost:443',
})



accessClient.interceptors.request.use(
    function(config){
        const token = JSON.parse(sessionStorage.getItem("user")).token;
        
        console.log(token);
       
        if(token){
            config.headers["Authorization"] = 'Bearer ' + token;
        }

        return config;
    },
    function(err){
        return Promise.reject(err);
    }
)



accessClient.interceptors.response.use(
    function (response){

        return response;
    },

    async function (err) {

        try{
            if(err.response.status === 401){

                const origianlConfig = err.config;
                

                const access = await axios.post("/api/auth/re-access?access=" + JSON.parse(sessionStorage.getItem("user")).token  ,{
                    
                }, {
                    withCredentials: true
                });
                

                const user = JSON.parse(sessionStorage.getItem("user"));
                const token = access.headers.authorization.replace("Bearer ", "");                
                const userData = {
                    "id": user.id,
                    "nickname": user.nickname,
                    "token": token 
            
                }
                
                sessionStorage.setItem("user", JSON.stringify(userData));
                console.log("reaccess : " + JSON.parse(sessionStorage.getItem("user")).token)

                origianlConfig.headers = {
                    Authorization: 'Bearer ' + token
                }

                return await accessClient.request(origianlConfig);
            }

        } catch{
            console.log("access fail");

            sessionStorage.clear();
            //document.location.href = "/login"
           
            return Promise.reject(err);
        }
        return Promise.reject(err);
    }

)
    
export default accessClient;