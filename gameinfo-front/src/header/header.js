import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {React } from 'react';
import {Link, useHistory} from 'react-router-dom'
import './header.css'
import {API_URL} from '../properties.js'

export default function Header(){


    const [isLoggedIn, setLoggedIn] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    
    let header;


    useEffect(() => {
        if(user !== null){
            setLoggedIn(true);
        } else{
            setLoggedIn(false);
        }

    });


    if(isLoggedIn){
        header = <LoginHeader user={user} setLoggedIn={setLoggedIn}/>
    } else{
        header = <NotLoginHeader />
    }

    return (
        <>
        <div className='header-container'>
            <nav className='header-nav'>
                {header}
            </nav>
        </div>
        <div className='header clear'></div>
        </>
    );

}



function LoginHeader(props){

    const history = useHistory();
    const user = props.user;

    const logout = async () => {
        

        axios.post("/api/user/logout",{},{
            headers:{
                'Authorization': 'Bearer ' + user.token
            }
        })
        .then(result => {
            props.setLoggedIn(false);
            localStorage.clear();
            alert("로그아웃이 정상적으로 이루어졌습니다.")
            history.push("/");
        })
        .catch(error => {
             alert(error)
        })

    };



    return (
        <>
            <ul className='header-ul'>
                <li className='header-item ' ><button onClick={logout}>로그아웃</button></li>
                <li className='header-item'><Link className='header item text' to='/member/info'>{user.nickname}님</Link></li>
            </ul>    
        </>
    )
}

function NotLoginHeader(props){
    return (
        <>
            <ul className='header-ul'>
                <li className='header-item'><Link className='header item text' to='/join'>회원가입</Link></li>
                <li className='header-item ' ><Link className='header item text' to='/login'>로그인</Link></li>
            </ul>    
        </>
    )
}
