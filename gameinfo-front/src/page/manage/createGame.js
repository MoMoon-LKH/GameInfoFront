import accessClient from "../../refresh"
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Table } from "react-bootstrap";
import userEvent from "@testing-library/user-event";

export default function CreateGame(){

    const [inputs, setInputs] = useState();
    const [imgId, setImgId] = useState(null);
    const [genres, setGenres] = useState({})
    const [platforms, setPlatforms] = useState({});
    const [modalVisible, setModalVisible] = useState(false)
    const [genreModal, setGenreModal] = useState(false);


    const handleInputs = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleImg = async e => {

        const form = new FormData();

        form.append("file", e.target.files[0]);

        const imgUpload = await accessClient.post("/api/user/image", form, { 
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        .then(res => {
            document.getElementById("input-image").value = res.data.id
            document.getElementById("games_img").src = "https://localhost:443/api/all/image/" + res.data.url;
            console.log(document.getElementById("input-image").value)

        })
    }

    const genrePopUp = () => {
        setGenreModal(true);
        popUP();

    }

    const genreOnClose = () => {
        setGenreModal(false);
        onClose();
    }

    const popUP = () =>{
        setModalVisible(true);
    }

    const onClose = () => {
        setModalVisible(false);
    }

    useEffect(() => {

    }, [])

    return(
        <>
        <div className="container">
            <div className="title">게임 생성</div>
            <div>
                <div>
                    <div>
                        <input style={{display: "none"}} type='text' id="input-image"/>
                        <img id="games_img" style={{witdh: "300px", height: "300px"}} alt=''/>
                    </div>
                    <input type='file' name='image' onChange={handleImg} />
                </div>
                <div className="input-div">
                    <span>이름: </span><input type='text' name='name' onChange={handleInputs}/>
                </div>
                
                <div className="input-div">
                    <span>개발사: </span><input type='text' name='company' onChange={handleInputs}/>
                </div>
                <div className="input-div">
                    <span>발매일: </span><input type='date' name='release_date' onChange={handleInputs}/>
                </div>
                <div className="input-div">
                    <div>장르 <button onClick={genrePopUp}>추가</button></div>
                    <div>
                        <table></table>
                    </div>
                </div>
                <div className="input-div">
                    <div>플랫폼 <button onClick={popUP}>추가</button></div>
                    <div>

                    </div>
                </div>
                <div className="input-div">
                    <div>소개말</div>
                    <textarea name='introduction' onChange={handleInputs} />
                </div>
                <div><button>추가</button> <button>취소</button></div>
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
                      left: "20%",
                      width: "60%",
                      height: "60%",
                      border: "1px solid #ccc",
                      background: "#fff",
                      overflow: "auto",
                      WebkitOverflowScrolling: "touch",
                      borderRadius: "4px",
                      outline: "none",
                      padding: "20px",
                    },
                  }}>
                {genreModal ?
                    <GetGenresModal onClose={genreOnClose} setGenres={setGenres}/>
                    :
                    <GetPlatformModal onClose={onClose} setPlatforms={setPlatforms}/>
                }
            </ReactModal>
        </div>
        </>
    )
    

    function GetGenresModal(props){

        const [input, setInput] = useState();
        const [list, setList] = useState([]);
        const [select, setSelect] = useState([]);
        const [checked, setCheked] = useState({
            id: '',
            name: ''
        });

        const handleInput = e => {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
        
        const getList = e => {
            accessClient.get("/api/manage/genre/list/all")
            .then(res => {
                setList(res.data);
            })
        }

        const handleChecked =  e => {
            let element = document.getElementsByClassName('list-td')
            
            for(var i = 0; i < element.length; i++)
                element[i].style.background = 'white'

            e.target.style.backgroundColor = 'gray'

            setCheked({
                id: e.target.getAttribute('val'),
                name: e.target.getAttribute('name')
            } )
        }

        useEffect(() => {

        }, [checked])


        const handleAddSelect = e => {
            
            console.log(select.find(item => item.id === checked.id))
        
           if(select.find(item => item.id === checked.id) === undefined)
                setSelect([...select, checked])
            else 
                alert("이미 추가된 장르입니다.") 
                 
        } 

        useEffect(() => {
            console.log(select)
        }, [select])

        
      

        const handleDeleteSelect = e => {

        }

       
        useEffect(() => {
            getList();
            
        }, [])

        return(
            <>
                <div>장르 추가</div>
                <div>
                    <input name="search" onChange={handleInput}/><button>검색</button>
                </div>
                <div style={{margin: "20px"}}>
                    <div style={{display: 'inline-block', width: '200px', height: '220px', overflowY: 'scroll', border: "1px solid #444444", margin: '10px'}}>
                        <Table >
                            <tbody>
                                {list.map(({id, name}) => (
                                    <tr key={id} className="list-tr">
                                        <td id={id} className="list-td" onClick={handleChecked} val={id} name={name}>{name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div style={{display: 'inline-block'}}> 

                        <div >
                            <div>
                                <button onClick={handleAddSelect}>&gt;</button>
                            </div>
                            <div>
                                <button>&lt;</button>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'inline-block', width: '200px', height: '220px', overflowY: 'scroll', border: "1px solid #444444", margin: '10px'}}>
                        <Table>
                            <tbody>
                               {select.map(({id, name}) => (
                                    <tr key={id} className="list-tr">
                                        <td className="list-td" onClick={handleChecked} val={id}>{name}</td>
                                    </tr> 
                               ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <button>추가</button><button onClick={props.onClose}>취소</button>
            </>
        )
        
    }
    
    function GetPlatformModal(props){
    

        return (
            <>
                <div>플랫폼 모달</div>
                <button>추가</button><button onClick={props.onClose}>취소</button>
            </>
        )
    }
 
}

