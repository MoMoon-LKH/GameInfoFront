import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Games(){
    
    const [games, setGames] = useState([]);
    const [column, setColumn] = useState('name');
    const [input, setInput] = useState()
    const history = useHistory();

    const getGames = () => {
        axios.get("/api/all/games/list")
        .then(res => {
            setGames(res.data);
        })
    }

    useEffect(() => {
        getGames();
    }, [])

    const handleGameInfoPage = (data) => {
        history.push({
            pathname: "/games/info" ,
            state: {
                game: data
            }
        })
    }

    const handleInput = (e) =>{
        setInput({...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {
        setColumn(e.target.value);

    }


    const handleSearch = e => {
        axios.get("/api/all/games/search/column",{
            params: {
                column: column,
                search: input.search
            }
        }).then(res => {
            setGames(res.data)
        })
    }

    return (
    <>
        <div className="title" style={{textAlign: 'center'}}>게임 목록</div>
        <div className="container" style={{width: "60%", margin: "auto"}}>
            <div className="games-container">
                <div className="searech-name">
                    <select onChange={handleSelect} value={column}>
                        <option value="name">게임명</option>
                        <option value='company'>회사명</option>
                    </select>
                    <input type='text' placeholder="검색할 내용을 입력해주세요" style={{width: '350px'}} onChange={handleInput} name='search'/>
                    <span> <button onClick={handleSearch}>검색</button></span>
                </div>
                <Table style={{width: "500px", margin: "auto"}}>
                        <tbody>
                            { games.map(item => (
                                <tr key={item.id} onClick={handleGameInfoPage.bind(this, item)}>    
                                    <td style={{width: '140px'}}><img style={{width: '140px', height: '130px'}} src={"/api/all/image/" + item.imgUrl} /></td>
                                    <td style={{textAlign:'left', paddingTop:'20px'}}>
                                        <div>게임명: {item.name} </div>
                                        <div>회사: {item.company} </div>
                                        <div>발매일: {moment(item.releaseDate).format('YYYY.MM.DD')}</div>
                                        <div>지원 플랫폼: {item.platform}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            </div>
        </div>
    
    </>
    );
}

export default Games;