import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



export default function GamesNews(props) {

    const history = useHistory();
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);
    const category = {
        id: 1,
        name: '뉴스'
    }

    const handleList = async () => {
        const res = await axios.get("/api/all/post/list", {
            params:{
                categoryId: category.id,
                gameId: props.game.id
            }
        })

        setPosts(res.data.posts)
        setTotal(res.data.total)
    }

    useEffect(() => {
        handleList();
    }, [])


    return (
        <>
            <div className="category-div">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>조회</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.nickname}</td>
                                <td>{post.view}</td>
                                <td>{moment(post.createDate).format('YYYY-MM-DD HH:mm')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="table-bottom">
                    <div>
                        <button onClick={() => 
                            history.push({
                                pathname: "/post/create",
                                state: {
                                    category: category,
                                    game: props.game
                                }
                            })
                        } >글쓰기</button>
                    </div>
                </div>
            </div>

        </>
    )
}