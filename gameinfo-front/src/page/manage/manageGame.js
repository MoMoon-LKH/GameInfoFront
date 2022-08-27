import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import accessClient from "../../refresh";
import axios from "axios";

export default function ManageGame(){

    const [input, setInput] = useState({
        search: ''
    });
    const [games, setGames] = useState([]);


    const handleInput = e => {
        setInput({...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSearch = e => {
        alert(input.search);
    }

    const handleGameList = e => {
        axios.get("/api/all/games/list")
        .then(res => {
            setGames(res.data)
        })

    }

    const haddleSearch = e => {
        axios.get("/api/all/games/search?search" + input.search)
        .then(res => {
            setGames(res.data);
        })
    }

    useEffect(() => {
        handleGameList();
    }, [])

    return (
        <>
        <div className="container">
            <div className="title">게임 관리</div>
            <div><Link className="link-txt" to='/manage'>&lt; 관리페이지로</Link></div>
            <div>
                <input type='text' name='search' onChange={handleInput}/>
                <button onClick={handleSearch}>검색</button>
                <button><Link to='/manage/game/create'>추가</Link></button>
            </div>
            <div>
                <Table>
                    <tbody>

                    </tbody>
                </Table>
            </div>
            
        </div>
        </>
    )
}