import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {Table } from 'react-bootstrap'
import ReactModal from "react-modal";
import axios from "axios";


export default function ManageGenre(){

    const [inputs, setInputs] = useState({
        search: ""
    });

    const [genres, setGenres] = useState([])
    const [page, setPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));

   
    const handleInputs = e =>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        e.preventDefault();
    };

    useEffect(() =>{
         axios.get("/api/manage/genre/list", {
            headers:{
                'Authorization': 'Bearer ' + user.token
            }
         })
        .then((res) => {
            setGenres(res.data)
        })

    }, []);
    
    const handleSearch = e =>{
        axios.get("/api/manage/genre/search?search=" + inputs.search)
        .then( res => {
            setGenres(res.data)
            e.preventDefault();
        })
        
    }

    const onPopup = () =>{
        setModalVisible(true);
    }

    const onClose = () => {
        setModalVisible(false);
    }

    

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
                    <button onClick={handleSearch}>검색</button>
                    <button onClick={onPopup}>추가</button>
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
            <ReactModal isOpen={modalVisible} 
                 style={{
                    overlay: {
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(15, 15, 15, 0.79)",
                    },
                    content: {
                      position: "absolute",
                      top: "100px",
                      left: "35%",
                      width: "30%",
                      height: "25%",
                      border: "1px solid #ccc",
                      background: "#fff",
                      overflow: "auto",
                      WebkitOverflowScrolling: "touch",
                      borderRadius: "4px",
                      outline: "none",
                      padding: "20px",
                    },
                  }}
            >
                <CreateGenreModal onClose={onClose} handleInputs={handleInputs}/>
            </ReactModal>
        </div>
        </>
    )
}


function CreateGenreModal(props){

    const createGenre = e => {
        
        alert("성공적으로 추가되었습니다.")
        props.onClose();
    }

    return <>
        <div>
            <div>추가할 장르 이름</div>
            <input type='text' onChange={props.handleInputs}/>
            <div>
                <button onClick={createGenre}>추가</button><button onClick={props.onClose}>취소</button>
            </div>
        </div>
    </>
}
