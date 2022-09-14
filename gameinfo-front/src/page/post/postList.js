import axios, { Axios } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";


export default function PostList(props){

    const categoryId = props.category.id;
    const gameId = props.gameId;

    const [posts, setPosts] = useState([]);


    const handleList = () => {
        axios.get("/api/all/post/list", {
            params:{
                categoryId: categoryId,
                gameId: gameId
            }
        }).then(res => {
            setPosts(res.data);
        })
    }

    useEffect(() => {
        handleList();
    }, [])


    return (
        <>
            <div>{props.category.name} &gt;</div>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>조회</th>
                            <th>닐짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.size > 0 ? 
                            posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.nickname}</td>
                                <td>{post.view}</td>
                                <td>{post.createDate}</td>
                            </tr>
                        )) :
                            <tr><td colSpan={5}>해당 게시글이 없습니다.</td></tr>
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}