import accessClient from "../../refresh"
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Table } from "react-bootstrap";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";

export default function CreateGame(){

    const [inputs, setInputs] = useState();
    const [genres, setGenres] = useState([])
    const [platforms, setPlatforms] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [genreModal, setGenreModal] = useState(false);
    const [genresIds, setGenresIds] = useState([]);
    const [platformIds, setPlatformIds] = useState([])
    const history = useHistory();

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

    const handleCreate = e => {

        const data = {
            img_id: parseInt(document.getElementById('input-image').value),
            name: inputs.name,
            company: inputs.company,
            release_data: document.getElementById('release_date').value,
            genres: genresIds,
            platforms: platformIds,
            introduction: inputs.introduction
        }

        accessClient.post("/api/manage/games/new", data)
        .then(res => {
            alert(res.data.name + "가 정상적으로 저장되었습니다." )
            history.push("/manage/game")
        }).catch(error => {
            alert(error)
        })

        e.preventDefault();
    }

    const genrePopUp = () => {
        setGenreModal(true);
        popUp();

    }

    const genreOnClose = () => {
        setGenreModal(false);
        onClose();
    }

    const popUp = () =>{
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
                    <span>게임명: </span><input type='text' name='name' onChange={handleInputs}/>
                </div>
                
                <div className="input-div">
                    <span>개발사: </span><input type='text' name='company' onChange={handleInputs}/>
                </div>
                <div className="input-div">
                    <span>발매일: </span><input type='date' name='release_date' id="release_date"/>
                </div>
                <div className="input-div">
                    <div>장르 <button onClick={genrePopUp}>추가</button></div>
                    <div>
                        <Table>
                            <tbody>
                                {genres.map(({id, name}) => (
                                    <tr key={id}>
                                        <td val={id}>{name} <button>X</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="input-div">
                    <div>플랫폼 <button onClick={popUp}>추가</button></div>
                    <div>
                        <Table>
                            <tbody>
                                {platforms.map(({id, name}) => (
                                    <tr key={id}>
                                        <td val={id}>{name} <button>X</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="input-div">
                    <div>소개말</div>
                    <textarea name='introduction' onChange={handleInputs} />
                </div>
                <div><button onClick={handleCreate}>추가</button> <button>취소</button></div>
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
                    <GetGenresModal onClose={genreOnClose} setGenres={setGenres} setGenresIds={setGenresIds}/>
                    :
                    <GetPlatformModal onClose={onClose} setPlatforms={setPlatforms} setPlatformIds={setPlatformIds}/>
                }
            </ReactModal>
        </div>
        </>
    )
    

    function GetGenresModal(props){

        const [input, setInput] = useState();
        const [list, setList] = useState([]);
        const [select, setSelect] = useState([]);
        const [selectId, setSelectId] = useState([]);
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

        const handleSearch = e => {
            accessClient.get("/api/manage/genre/search/all?search=" + input.search)
            .then(res => {
                setList(res.data);
            })
        }

        useEffect(() => {
            getList();
            
        }, [])


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
            
        
           if(select.find(item => item.id === checked.id) === undefined){
                setSelect([...select, checked])
                setSelectId([...selectId, parseInt(checked.id)])
           }
            else 
                alert("이미 추가된 장르입니다.") 
                 
        } 


        const handleDeleteSelect = e => {
            const arr = select.filter((item) => item.id !== checked.id);
            const idArr = selectId.filter((item) => item !== checked.id);
            setSelect(arr)
            setSelectId(idArr)

        }


        useEffect(() => {
        }, [select])

        useEffect(() => {
        }, [selectId])


        const handleOk = () => {
            props.setGenres(select)
            props.setGenresIds(selectId);
            props.onClose();
        }

        
        
        return(
            <>
                <div>장르</div>
                <div>
                    <input name="search" onChange={handleInput}/><button onClick={handleSearch}>검색</button>
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
                                <button onClick={handleDeleteSelect}>&lt;</button>
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
                <button onClick={handleOk}>추가</button><button onClick={props.onClose}>취소</button>
            </>
        )
        
    }
    
    function GetPlatformModal(props){
        const [input, setInput] = useState();
        const [list, setList] = useState([]);
        const [select, setSelect] = useState([]);
        const [selectId, setSelectId] = useState([]);
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
            accessClient.get("/api/manage/platform/list/all")
            .then(res => {
                setList(res.data);
            })
        }

        const handleSearch = e => {
            accessClient.get("/api/manage/platform/search/all?search=" + input.search)
            .then(res => {
                setList(res.data);
            })
        }

        useEffect(() => {
            getList();
            
        }, [])


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
            
        
           if(select.find(item => item.id === checked.id) === undefined){
                setSelect([...select, checked])
                setSelectId([...selectId, parseInt(checked.id)])
            } else 
                alert("이미 추가된 플랫폼입니다.") 
                 
        } 


        const handleDeleteSelect = e => {
            const arr = select.filter((item) => item.id !== checked.id);
            const idArr = selectId.filter((item) => item !== checked.id);
            setSelect(arr)
            setSelectId(idArr)
        }


        useEffect(() => {
        }, [select])
        useEffect(() => {
        }, [selectId])



        const handleOk = () => {
            props.setPlatforms(select)
            props.setPlatformIds(selectId)
            props.onClose();
        }

        
        
        return(
            <>
                <div>플랫폼</div>
                <div>
                    <input name="search" onChange={handleInput}/><button onClick={handleSearch}>검색</button>
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
                                <button onClick={handleDeleteSelect}>&lt;</button>
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
                <button onClick={handleOk}>추가</button><button onClick={props.onClose}>취소</button>
            </>
        )
    }
 
}

