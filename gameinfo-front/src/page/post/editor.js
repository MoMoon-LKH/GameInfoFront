import { useRef, useState, useMemo } from "react";
import axios from 'axios'
import * as Properties from '../../properties.js'

//이렇게 라이브러리를 불러와서 사용하면 됩니다
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import accessClient from "../../refresh.jsx";
import ImageResize from "@looop/quill-image-resize-module-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";


const EditorComponent = (props) => {

    Quill.register('modules/ImageResize', ImageResize)

    const QuillRef = useRef();
    const [contents, setContents] = useState("");
    const [inputs, setInputs] = useState();
    const history = useHistory();
    const game = props.gameId;
    const [categoryId, setcategoryId] = useState(parseInt(props.categoryId));
    const [modalVisible, setModalVisible] = useState(false);

    const handleInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }


    // 이미지를 업로드 하기 위한 함수
    const imageHandler = () => {
        // 파일을 업로드 하기 위한 input 태그 생성
        const input = document.createElement("input");
        const formData = new FormData();
        let url = "";
        const ajaxUrl = "/api/user/image";

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        // 파일이 input 태그에 담기면 실행 될 함수 
        input.onchange = async () => {
        const file = input.files;
        if (file !== null) {
            
            formData.append("file", file[0]);
            

        // 저의 경우 파일 이미지를 서버에 저장했기 때문에
            // 백엔드 개발자분과 통신을 통해 이미지를 저장하고 불러왔습니다.
            try {
            //const res = axios를 통해 백엔드 개발자분과 통신했고, 데이터는 폼데이터로 주고받았습니다.
           
            const res = await accessClient.post(ajaxUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                // 백엔드 개발자 분이 통신 성공시에 보내주는 이미지 url을 변수에 담는다.
                url = "https://localhost:443/api/all/image/" + res.data.url;
            }).catch(error => {
                alert(error);
            })
            

        // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드 
            // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
            const range = QuillRef.current?.getEditor().getSelection()?.index;
            console.log(QuillRef.current);
            if (range !== null && range !== undefined) {
                let quill = QuillRef.current?.getEditor();

                quill?.setSelection(range, 1);

                quill?.clipboard.dangerouslyPasteHTML(
                range,
                `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
                );
            }

            return { ...res, success: true };
            } catch (error) {
            const err = error;
            return { ...err.response, success: false };
            }
        }
        };

        
    };


    // quill에서 사용할 모듈을 설정하는 코드 입니다.
    // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
    // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
    const modules = useMemo(
    () => ({
        toolbar: {
        container: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: ["small", false, "large", "huge"] }, { color: [] }],
            [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
            ],
            ["image", "video"],
        ],
        handlers: {
            image: imageHandler,
        },
        },
        ImageResize: {
            parchment: Quill.import('parchment')
        }
        
    }),
    []
    );


    const handlePost = () => {
        
        const data = {
            title: inputs.title,
            content: contents,
            memberId: JSON.parse(sessionStorage.getItem("user")).id,
            gameId: game,
            categoryId: categoryId
        }

        console.log(data);

        accessClient.post('api/user/post', data)
        .then( res => {
            console.log(res);
        }).catch(error => {
            alert(error);
        })

    }

    const handleBack = () => {
        history.goBack();
    }

    const findGames = (e) => {

    }

    const categoryRadio = (e) => {
        setcategoryId(parseInt(e.target.value))
    }

    const radioStyle = {
        margin: '5px 10px'
    }

    return (
    <>
        <div>
            <div style={{textAlign:'left'}}>
                <span>제목: </span><input style={{width:'500px'}} onChange={handleInput} name="title" placeholder="제목을 입력해주세요"/>
            </div>
            <div style={{  margin:'10px auto'}}>
                <ReactQuill
                        ref={(element) => {
                            
                            if (element !== null) {
                                QuillRef.current = element;
                            }
                        }}
                        value={contents}
                        onChange={setContents}
                        modules={modules}
                        theme="snow"
                        placeholder="내용을 입력해주세요."
                        />
            </div>
            <div className="selectOption" style={{textAlign: 'left'}}>
                <div className="post-div">
                    <div className="post-title">게시판 구분</div>
                    <div>
                        <span style={radioStyle} className="radioInputs"><input type='radio' value={1} checked={categoryId === 1 ? true : false} onChange={categoryRadio}/><label>뉴스</label></span>
                        <span style={radioStyle} className="radioInputs"><input type='radio' value={2} checked={categoryId === 2 ? true : false} onChange={categoryRadio}/><label>리뷰</label></span>
                        <span style={radioStyle} className="radioInputs"><input type='radio' value={3} checked={categoryId === 3 ? true : false} onChange={categoryRadio}/><label>공략/팁</label></span>
                        <span style={radioStyle} className="radioInputs"><input type='radio' value={4} checked={categoryId === 4 ? true : false} onChange={categoryRadio}/><label>자유게시판</label></span>
                    </div>
                </div>
                {/* <div className="post-div">
                    <div className="post-title">해당 게임</div>
                    <span>선택 안함</span><button onClick={findGames}>선택</button>
                </div> */}
            </div>
            <div className="btn-div" style={{textAlign:'center', margin:'20px auto'}}>
                    <button onClick={handlePost}>작성</button> <button onClick={handleBack}>취소</button>
            </div>  
        </div> 
    </>
    )
}

export default EditorComponent;