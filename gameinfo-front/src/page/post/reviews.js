import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Paging from "./paging";



export default function Reviews(){

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([])

    const handleReview = async () => {
        const res = await axios.get("/api/all/post/list",{
            params: {
                categoryId: 2,
                page: page
            }
        })
        
        setPosts(res.data.posts);
        setTotal(res.data.total);
        
    }

    const onChangePage = (e) => {

    }

    useEffect(() => {
        handleReview();
    }, [])

    return (
        <>
         <div className="title" style={{textAlign: 'center'}}>리뷰</div>
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
                        {posts.map(post => (
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
