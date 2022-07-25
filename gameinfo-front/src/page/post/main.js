import { Link } from 'react-router-dom';
import './main.css'


function Main(){
    


    return (
        <div className='main-container'>
            <div className='post-div'>
                <div className='posts-subtitle'><Link className='main-link' to='/'>주요 뉴스 &gt;</Link>  </div>
            </div>
            <div className='post-div'>
                <div className='posts-subtitle'><Link className='main-link' to='/'>리뷰 &gt;</Link></div>
            </div>
        </div>
    );
}

export default Main;