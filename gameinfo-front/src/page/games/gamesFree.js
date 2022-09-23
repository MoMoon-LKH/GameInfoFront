import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Paging from "../post/paging";
import PostList from "../post/postList";


export default function GamesFree(props){

    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const history = useHistory();
    const category = {
        id: 4,
        name: '자유게시판'
    }

    const handleList = async () => {
        const res = await axios.get("/api/all/post/list", {

            params:{
                categoryId: category.id,
                gameId: props.game.id,
                page: page - 1
            }
        })

        setPosts(res.data.posts);
        setTotal(res.data.total);
        
    }

    const handlePageList = (e) => {

    }

    useEffect(() => {
        handleList();
    }, [])

    return (
        <>
            <div className="table-div">

            <PostList posts={posts} />
                <div className="table-bottom">
                    <div>
                        <Paging page={page} perPage={10} total={total} setPage={handlePageList} />
                    </div>
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