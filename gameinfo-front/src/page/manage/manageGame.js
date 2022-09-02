import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import accessClient from "../../refresh";
import axios from "axios";
import moment from "moment";

export default function ManageGame(){

    const [input, setInput] = useState({
        search: ''
    });
    const [games, setGames] = useState([]);
    const history = useHistory();


    const handleInput = e => {
        setInput({...input,
            [e.target.name]: e.target.value
        })
    }


    const handleGameList = e => {
        axios.get("/api/all/games/list")
        .then(res => {
            setGames(res.data)
        })

    }

    const handleSearch = e => {
        axios.get("/api/all/games/search?search=" + input.search)
        .then(res => {
            setGames(res.data);
        })
    }

    useEffect(() => {
        handleGameList();
    }, [])

    const handleGamePage = (item) => {
        history.push({
            pathname: "/manage/game/" + item.id,
            state: {
                game: item
            }
        })

    }

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
                <div style={{marginRight: '400px'}}>게임 목록</div>
                <Table style={{width: "500px", margin: "auto"}}>
                    <tbody>
                        {games.map(item => (
                            <tr key={item.id} onClick={handleGamePage.bind(this, item)}>    
                                <td style={{width: '140px'}}><img style={{width: '140px', height: '130px'}} src={"/api/all/image/" + item.imgUrl} /></td>
                                <td style={{textAlign:'left', paddingTop:'20px'}}>
                                    <div>게임명: {item.name} </div>
                                    <div>회사: {item.company} </div>
                                    <div>발매일: {moment(item.releaseDate).format('YYYY-MM-DD')}</div>
                                    <div>지원 플랫폼: {item.platform}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            
        </div>
        </>
    )
}