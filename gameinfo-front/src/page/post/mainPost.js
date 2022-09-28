import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PostForm from "./postForm";
import PostGames from "./postGames";


export default function MainPost(){
    const [post, setPost] = useState({});
    const [member, setMember] = useState({});
    const [category, setCategory] = useState({});
    const [game, setGame] = useState({});
    const param = useParams();

    useEffect(() => {

        axios.get("/api/all/post/" + param.id)
        .then(res => {
            setPost(res.data.post);
            setMember(res.data.member);
            setCategory(res.data.category);        
            setGame(res.data.game);
        
        });
    }, [])

    
    return (
        <>
         <div className="post-container">
                <div className="post-div post-category">
                        <div>{category.name} &gt;</div>
                </div>
                
                <PostForm post={post} member={member} />
                <div style={{marginTop: '15px'}}>
                    <PostGames game={game}/>

                </div>
                
                <div className="comment-container">
                    <div>댓글 총 <span >0</span>개</div>
                    <div className="comments">

                    </div>
                </div>
                
            </div>
        </>
    )
}