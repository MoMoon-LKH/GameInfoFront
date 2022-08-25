import { useEffect, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import {Table } from 'react-bootstrap'
import ReactModal from "react-modal";
import axios from "axios";
import accessClient from "../../refresh";

export default function ManageGenre(){

    const [inputs, setInputs] = useState({
        search: "",
        name: ""
    });

    const [updateGenre, setUpdateGenre] = useState({
        id: "",
        name: ""
    })

    const [genres, setGenres] = useState([])
    const [page, setPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [checkedList, setCheckedList] = useState(new Set());
    const [updateModal,setUpdateModal] = useState(false);
   
    const handleInputs = e =>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        e.preventDefault();
    };

    const handleGenreList = async e => {
        accessClient.get("/api/manage/genre/list", {
        })
        .then((res) => {
            setGenres(res.data)
        })
    };

    const handleChecked = (checked, id) => {
        if (checked) {
            checkedList.add(parseInt(id));
            setCheckedList(checkedList);
               
        } else if (!checked) {
            checkedList.delete(parseInt(id));
            setCheckedList(checkedList);
        }
    }

    const handleGenreDelete = e => {

        accessClient.delete("/api/manage/genre", {
            data: {
                ids: Array.from(checkedList)
            } 
        }).then( response => {
            if(response.data){
                setCheckedList(null);
                handleGenreList();
                
            }

        })
    }

    const handleUpdateModal = e =>{
        if(checkedList.size === 1){
            const id = Array.from(checkedList)[0]
            let name = document.getElementById("table-name" + id).innerHTML;
            setUpdateGenre({
                id: id,
                name: name
            })
            setUpdateModal(true);
            onPopup();     

        } else if(checkedList.size < 1){
            alert("수정할 장르를 선택해주세요")
        } else{
            alert("해당 장르를 하나만 선택해주세요")
        }

       
        
    }



    useEffect(() =>{
        handleGenreList();        
    }, []);
    
    const handleSearch = e =>{
        accessClient.get("/api/manage/genre/search?search=" + inputs.search, {
            
            })
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
                    <button onClick={handleUpdateModal}>수정</button>
                    <button onClick={handleGenreDelete}>삭제</button>
                </div>
                <div className="main-table">
                    <Table className="table">
                        <tbody>
                            {genres.map(({id, name}) =>(
                               <tr key={id}>
                                <td><input type='checkbox' value={id} name={name} onChange={e => {handleChecked(e.target.checked, e.target.value)}}  /></td>
                                <td id={'table-name' + id}>{name}</td>
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
            >   {updateModal ?
                    <UpdateGenreModal onClose={onClose} handleInputs={handleInputs} inputs={inputs} handleGenreList={handleGenreList} user={user} genre={updateGenre} setUpdateModal={setUpdateModal}/>
                    :
                    <CreateGenreModal onClose={onClose} handleInputs={handleInputs} inputs={inputs} handleGenreList={handleGenreList} user={user} />
                }
            </ReactModal>
        </div>
        </>
    )
}


function CreateGenreModal(props){

    const createGenre = e => {
        accessClient.post("/api/manage/genre/new",{
            name: props.inputs.name
        }, {
            headers:{
                'Authorization': 'Bearer ' + props.user.token
            }
            })
        .then( res =>{
            alert(res.data + " 성공적으로 추가되었습니다.");
            props.onClose();
            props.handleGenreList();
        }).catch(error =>{
            alert("장르 추가에 실패하였습니다.")
        })

    }

    return <>
        <div>
            <div>추가할 장르 이름</div>
            <input type='text' name="name" onChange={props.handleInputs}/>
            <div>
                <button onClick={createGenre}>추가</button><button onClick={props.onClose}>취소</button>
            </div>
        </div>
    </>
}


function UpdateGenreModal(props){

    const updateGenre = e => {
        accessClient.put("/api/manage/genre",{
            id: props.genre.id,
            name: props.inputs.name
        }, {
            
            })
        .then( res =>{
            alert(props.genre.name + "이 " + res.data.name +"로 수정되었습니다.");
            props.onClose();
            props.setUpdateModal(false);
            props.handleGenreList();
        }).catch(error =>{
            alert("장르 수정에 실패하였습니다.")
        })

    }

    const cancelUpdate = e => {
        props.setUpdateModal(false);
        props.onClose();
    }

    return <>
        <div>
            <div>수정할 장르: {props.genre.name}</div>
            <input type='text' name="name" onChange={props.handleInputs}/>
            <div>
                <button onClick={updateGenre}>추가</button><button onClick={cancelUpdate}>취소</button>
            </div>
        </div>
    </>
}
