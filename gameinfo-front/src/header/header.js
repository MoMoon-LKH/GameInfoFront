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
    const [isAuth, setAuth] = useState(false);
    let header;

    useEffect(() => {
        if(user !== null){
            setLoggedIn(true);

            axios.get("/api/user/is-manage",{  // useEffect를 통해 동기 호출 => useState 변경으로 인해 재렌더링
                headers:{
                    'Authorization': 'Bearer ' + user.token
                }
            })
            .then(res => {
                setAuth(res.data)
            })
            
        } else{
            setLoggedIn(false);
        }

    },[]);



    if(isLoggedIn){
        header = <LoginHeader user={user} auth={isAuth} setLoggedIn={setLoggedIn}/>
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
    let manage;

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
                <li className='header-item' ><button onClick={logout}>로그아웃</button></li>
                <li className='header-item'><Link className='header item text' to='/member/info'>{user.nickname}님</Link></li>
                {props.auth &&
                    <li className='header-item'><Link className='header item text' to='/manage'>관리자 페이지</Link></li>
                }
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


