import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './login.css'
import {Button} from "react-bootstrap"

function Login(){

    const history = useHistory();


    const [inputs, setInputs] = useState({
        memberId: "",
        password: ""
    });

    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }


    const handleSubmit = async e =>{

        const header = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    

        axios.post("/api/auth/login", inputs, header)
        .then(res => {
        
        const data = {
            "id": res.data.id,
            "nickname": res.data.nickname,
            "totken": res.data.accessToken
        }

        localStorage.setItem("user", JSON.stringify(data))


        axios.defaults.headers.common[
            "Authorization"  
        ] = 'Bearer ' + res.data.accessToken;

        
        history.push("/");

    })
    .catch(e =>{
        alert(e)
    })

    e.preventDefault();
        
          
         

        
    }
    

    return (
        <div className='container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='login-div'>
                    <div className='login-form-div'>
                        <div id='login-form-subtitle'>GameInfo</div>
                    </div>
                    <div className='login-div'>
                        <div><input name="memberId" className='login-input' type='text' onChange={handleChange} placeholder='아이디를 입력해주세요'></input></div>
                    </div>
                    <div className='login-div'>
                        <div><input name='password' className='login-input' type='password' onChange={handleChange} placeholder='비밀번호를 입력해주세요'></input></div>
                    </div>

                    <div className='login-div text'>
                        <Link className='text' to='/join'>회원가입</Link><span> | </span><Link className='text' to='/'>비밀번호 찾기</Link>
                    </div>
                    <div className='login-div'>
                        <div><Button id='login-button' type='submit' >로그인</Button></div>
                    </div>
                
                </div>
            </form>
        </div>
        
    );

}

export default Login;