import './category.css'
import {Link} from 'react-router-dom'


function Category(){



    return (
        <div className='category-container'>
            <ul className='category-ul'>
                <li className='category-li'><Link className='li-link' to="/">메인</Link></li>
                <li className='category-li'><Link className='li-link' to="/news">뉴스</Link></li>
                <li className='category-li'><Link className='li-link' to="/reviews">리뷰</Link></li>
                <li className='category-li'><Link className='li-link' to="/games">게임게시판</Link></li>
            </ul>
        </div>
    )
}

export default Category;