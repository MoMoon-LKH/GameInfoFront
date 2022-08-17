import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'
import axios from "axios";


export default function ManageGenre(){

    const [inputs, setInputs] = useState({
        search: ""
    });

    const [genres, setGenres] = useState([])
    const [page, setPage] = useState(0);
    const user = JSON.parse(sessionStorage.getItem("user"));


    const handleInputs = e =>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() =>{
         axios.get("/api/manage/genre/list", {
            headers:{
                'Authorization': 'Bearer ' + user.token
            }
         })
        .then((res) => setGenres(res.data))

    }, []);

    console.log(genres);


    return (
        <>
        <div className="container">
            <div className="container-header">
                <div className="title">장르 관리</div>
                <div><Link className="link-txt" to='/manage'>&lt;  관리페이지로</Link></div>
            </div>
            <div className="container-body">
                <div className="table">
                    <input id='search-input' name="search" value={inputs.search}  type='text' onChange={handleInputs} placeholder="검색할 내용을 입력해주세요." />
                    <button >검색</button>
                </div>
                <div className="main-table">
                    <Table className="table">
                        <tbody>
                            {genres.map(({id, name}) =>(
                               <tr>
                                <td>{id}</td>
                                <td>{name}</td>
                               </tr> 
                            ))}
                        </tbody>
                    </Table>
                </div>

            </div>

        </div>
        </>
    )
}


function renderingTable(page){

    let content = '';
    const token = sessionStorage.getItem("user").getItem("token");

    axios.get("/api/manage/genre/list")


    return 
}
