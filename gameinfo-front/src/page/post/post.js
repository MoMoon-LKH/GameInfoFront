import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


export default function Post(props) {

    const [post, setPost] = useState({
        id: '',
        title: '',
        content: '',
        createDate: '',
        nickname: '',
        memberId: '',
        gameId: ''

    });
    const param = useParams();


    useEffect(() => {

        axios.get("/api/all/post/" + param.id)
        .then(res => {
            setPost(res.data);
        })
    
    }, [])

    return (
        <>
            
            <div className="container">
                <div>
                    {post.title}
                </div>
                <div>
                    <span>작성자: </span><span>{post.nickname}</span>
                </div>
                <div>
                    <span>작성일: </span><span>{moment(post.createDate).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{__html: post.content}}>
                    </div>
                </div>
                
            </div>
        </>
    )

}