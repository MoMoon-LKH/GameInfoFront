import {React, ReactDOM } from 'react';
import {Link} from 'react-router-dom'
import './header.css'

export default class Header extends React.Component{

    constructor(props){
        super(props)
    
    }


    render(){
        const user = JSON.parse(localStorage.getItem("user"))
        
        let header;

        if(this.props.isLogin){
            header = <LoginHeader nickname={user.nickname}/>
        } else{
            header = <NotLoginHeader/>
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
    };

}

ReactDOM.render(
    <Header />,
    document.getElementById('root')
  );

function LoginHeader(props){


    return (
        <>
            <ul className='header-ul'>
                <li className='header-item '><Link className='header item text' >로그아웃</Link></li>
                <li className='header-item'><Link className='header item text' to='/member/info'>{props.nickname}님</Link></li>
            </ul>    
        </>
    )
}

function NotLoginHeader(){
    return (
        <>
            <ul className='header-ul'>
                <li className='header-item'><Link className='header item text' to='/join'>회원가입</Link></li>
                <li className='header-item '><Link className='header item text' to='/login'>로그인</Link></li>
            </ul>    
        </>
    )
}
