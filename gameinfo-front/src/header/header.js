import {Link} from 'react-router-dom'
import './header.css'

export function NotLoginHeader(){
    return (
        <>
        <div className='header div'>
            <nav id='header nav'>
                <Link className='header item text' id='logo' to='/'>Home</Link>
                <ul className='header ul'>
                    <li className='header item '><Link className='header item text' to='/join'>회원가입</Link></li>
                    <li className='header item '><Link className='header item text' to='/login'>로그인</Link></li>
                </ul>
            </nav>
        </div>
        <div className='header clear'></div>
        </>
    );
  }