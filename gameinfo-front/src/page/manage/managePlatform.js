import { useEffect, useState} from "react"
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
    const [checkList, setCheckList] = useState(new Set());
    const [updatePlatform, setUpdatePlatform] = useState({
        id: '',
        name: ''
    })

    const handleInputs = e =>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    
        e.preventDefault();
    };

    const handlePlatformList = e => {

        accessClient.get("/api/manage/platform/list")
        .then(res => {
            setPlatforms(res.data);
        })

    }

    const handleSearch = e => {
       
        accessClient.get("/api/manage/platform/search?search=" + inputs.search)
        .then(res => {
            setPlatforms(res.data);
        })
    
    }

    const handleCheck = e =>{
        if(e.target.checked){
            checkList.add(e.target.value);
            setCheckList(checkList)
        } else{
            checkList.delete(e.target.value);
            setCheckList(checkList)
        }
    }

    

    const handleUpdate = () => {
        if(checkList.size === 1){
            let id = Array.from(checkList)[0];
            let name = document.getElementById('table-name' + id).innerHTML;

            setUpdatePlatform({
                id: id,
                name: name
            })
            setUpdateModal(true);
            onPopup(); 
           

        } else if(checkList.size < 1){
            alert("수정할 플랫폼을 선택해주세요")
        } else{
            alert("하나만 선택해주세요")
        }
        
    }


    const handleDelete = () => {
        if(checkList.size > 0){
            accessClient.delete("/api/manage/platform",{
                data: {
                    ids: Array.from(checkList)
                }
            }).then(res => {
                alert("삭제에 성공했습니다.")
                handlePlatformList();
            }).catch(err => {
                alert("삭제에 실패했습니다 ")
            })
        } else{
            alert("삭제할 플랫폼을 하나 이상 선택해주세요")
        }
    }

    const onPopup = () => {
        setModalVisible(true);
    }

    const onClose = () => {
        setModalVisible(false);
    }



    useEffect(() => {
        handlePlatformList();
    }, [])


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
                    <button onClick={handleUpdate}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
                <Table>
                    <tbody>
                        {platforms.map(({id, name})=>(
                            <tr key={id}>
                                <td><input type='checkbox' value={id} onChange={handleCheck}/></td>
                                <td id={'table-name' + id}>{name}</td>
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
                    <UpdatePlatformModal onClose={onClose} setUpdateModal={setUpdateModal} platform={updatePlatform} handlePlatformList={handlePlatformList}/>
                    :
                    <CreatePlatformModal  onClose={onClose}  handlePlatformList={handlePlatformList}/>
                }
            </ReactModal>
        </div>
        </>
    )


    function UpdatePlatformModal(props){

        const [input, setInput] = useState();


        const handleInput = e => {
            setInput({...input,
                [e.target.name]: e.target.value})
            e.preventDefault();
        }

        const cancel = e => {
            props.setUpdateModal(false);
            props.onClose();
        }
        

        const handleUpdateInput = e =>{

            if(input.name !== null){
                accessClient.put("/api/manage/platform",{
                    id: props.platform.id,
                    name: input.name
                }).then(res => {
                    alert(props.platform.name + "가 " + res.data.name + "로 변경되었습니다")
                    cancel();
                    props.handlePlatformList();
                })      
            }
            
        }

        return <>
            <div>플랫폼 수정</div>
            <div>수정할 플랫폼: {props.platform.name}</div>
            <div><input type='text' name="name" onChange={handleInput}/></div>
            <div><button onClick={handleUpdateInput}>수정</button><button onClick={cancel}>취소</button></div>
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
      

        return <>
            <div>플랫폼 추가</div>
            <div>추가할 이름: <input type='text' name="name" onChange={handleInput}/></div>
            <div><button onClick={create}>추가</button><button onClick={props.onClose}>취소</button></div>

        </>
    }
}