import {Link} from 'react-router-dom'
import './header.css'
import Auth from '../auth.js'

export function Header(props){

    console.log(props.user)

    return (
        <>
        <div className='header-container'>
            <nav className='header-nav'>
                
                    {
                        props.user
                        ?
                        <ul className='header-ul'>
                        <li className='header-item'><Link className='header item text' to={'/member'}>님</Link></li>
                        <li className='header-item ' onClick={Auth.logoutFunc()}><Link className='header item text' to='/'>로그아웃</Link></li>
                        </ul>
                        :
                        <ul className='header-ul'>
                        <li className='header-item'><Link className='header item text' to='/join'>회원가입</Link></li>
                        <li className='header-item '><Link className='header item text' to='/login'>로그인</Link></li>
                        </ul>
                    }
            </nav>
        </div>
        <div className='header clear'></div>
        </>
    );
}
