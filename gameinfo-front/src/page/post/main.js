import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import accessClient from '../../refresh';
import './main.css'


function Main(){
    
    const [news, setNews] = useState([]);
    const [review, setReview] = useState([]);

    const handleNews = () => {
        axios.get("/api/all/post/main", {
            params: {
                categoryId: 1
            }
        })
        .then(res => {
            setNews(res.data);
        })
    }

    const handleReview = () => {
        axios.get("/api/all/post/main", {
            params: {
                categoryId: 2
            }
        })
        .then(res => {
            setReview(res.data);
        })
    }

    useEffect(() => {
        handleNews();
        handleReview();

    }, [])

    return (
        <div className="container" style={{width: "60%", margin: "auto"}}>
            <div className='post-div'>
                <div className='posts-subtitle'><Link className='main-link' to='/'>주요 뉴스 &gt;</Link></div>
                <Table>
                    <tbody>     
                        {news.map(post => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                
            </div>
            <div className='post-div'>
                <div className='posts-subtitle'><Link className='main-link' to='/'>리뷰 &gt;</Link></div>
                <Table>
                    <tbody>     
                        {review.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.nickname}</td>
                                <td>{post.view}</td>
                                <td>{post.createDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Main;