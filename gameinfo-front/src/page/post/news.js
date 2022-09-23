import axios from "axios";
import { Button } from "bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import Paging from "./paging";
import moment from "moment";

function News(){

    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [news, setNews] = useState([]);

    const handleNews = async () => {
        const res = await axios.get("/api/all/post/list",{
            params: {
                categoryId: 1,
                page: page
            }
        })
        
        setNews(res.data.posts)
        setTotal(res.data.total)
    }

    const onChangePage = (e) => {
         console.log(e);
    }

    useEffect(() => {
       handleNews();

    }, [])


    return (
        <>
        <div className="title" style={{textAlign: 'center'}}>뉴스</div>
        <div className="container" style={{width: "60%", margin: "auto"}}>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>조회</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map(post => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.nickname}</td>
                                <td>{post.view}</td>
                                <td>{moment(post.createDate).format('YYYY-MM-DD HH:mm')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div>
                <Paging page={page} perPage={10} total={total} setPage={onChangePage}/>
            </div>
        </div>
        </>
    )
}

export default News;