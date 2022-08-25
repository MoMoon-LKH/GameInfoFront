import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import accessClient from "../../refresh"
import { Table } from "react-bootstrap";
import ReactModal from "react-modal";


export default function ManagePlatform(){

    const [platforms, setPlatforms] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        search: ""
    });


    const handleInputs = e =>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })

        console.log("inputs: " + inputs.name)

        e.preventDefault();
    };

    const handlePlatformList = e => {

        accessClient.get("/api/manage/platform/list")
        .then(res => {
            setPlatforms(res.data);
        })
    }

    const handleSearch = e => {
        alert(inputs.search);
    }

    useEffect(() => {
        handlePlatformList();
    }, [])

    const updateBtn = () => {
        setUpdateModal(true);
        onPopup();
    }

    const onPopup = () => {
        setModalVisible(true);
    }

    const onClose = () => {
        setModalVisible(false);
    }

    return (
        <>
        <div className="container">
            <div>
                <div className="title">플랫폼 관리</div>
                <div><Link className="link-txt" to='/manage'>&lt;  관리페이지로</Link></div>
            </div>
            <div className="table_container">
                <div className="table_function">
                    <input type='text' name="search" onChange={handleInputs}/>
                    <button onClick={handleSearch}>검색</button>
                    <button onClick={onPopup}>추가</button>
                    <button onClick={updateBtn}>수정</button>
                    <button>삭제</button>
                </div>
                <Table>
                    <tbody>
                        {platforms.map(({id, name})=>(
                            <tr key={id}>
                                <td><input type='checkbox' value={id}/></td>
                                <td>{name}</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
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
                    <UpdatePlatformModal onClose={onClose} setUpdateModal={setUpdateModal}/>
                    :
                    <CreatePlatformModal  onClose={onClose} handleInputs={handleInputs} inputs={inputs} handlePlatformList={handlePlatformList}/>
                }
            </ReactModal>
        </div>
        </>
    )


    function UpdatePlatformModal(props){


        const cancel = e => {
            props.setUpdateModal(false);
            props.onClose();
        }

        return <>
            <div>update</div>
            <div><button>수정</button><button onClick={cancel}>취소</button></div>
        </>
    }

    function CreatePlatformModal(props){
        
        const [input, setInput] = useState();


        const handleInput = e => {
            setInput({...input,
                [e.target.name]: e.target.value})
            e.preventDefault();
        }


        const create = () => {
            if(input.name !== null){
                accessClient.post("/api/manage/platform/new", {
                    name: input.name
                }).then(res => {
                    alert("저장되었습니다.")
                    props.handlePlatformList();
                    props.onClose();
                })
            } else{
                alert("추가할 이름을 입력해주세요")
            }
            
        }


        const cancel = e =>{
            props.onClose();
        }

        return <>
            <div>플랫폼 추가</div>
            <div>추가할 이름: <input type='text' name="name" onChange={handleInput}/></div>
            <div><button onClick={create}>추가</button><button onClick={cancel}>취소</button></div>

        </>
    }
}