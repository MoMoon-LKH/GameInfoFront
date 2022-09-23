import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function GamesFree(props){

    const gameId = props.game.id;
    const history = useHistory;

    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);

    return (
        <>
            
        </>
    )
}