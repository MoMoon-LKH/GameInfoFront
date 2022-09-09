import axios, { Axios } from "axios";
import { useEffect } from "react";
import { useState } from "react";


export default function PostList(props){

    const categoryId = props.category.id;
    const gameId = props.gameId;

    const [posts, setPosts] = useState();


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
                {posts}
            </div>
        </>
    )
}