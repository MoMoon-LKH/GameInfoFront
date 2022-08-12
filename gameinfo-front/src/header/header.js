import { useEffect } from 'react';
import { useState } from 'react';
import {React } from 'react';
import {Link} from 'react-router-dom'
import './header.css'

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
        header = <LoginHeader nickname={user.nickname}/>
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

    return (
        <>
            <ul className='header-ul'>
                <li className='header-item ' ><Link className='header item text' >로그아웃</Link></li>
                <li className='header-item'><Link className='header item text' to='/member/info'>{props.nickname}님</Link></li>
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
