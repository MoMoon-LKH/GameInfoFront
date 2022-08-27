import accessClient from "../../refresh"
import { useState } from "react";

export default function CreateGame(){

    const [file, setFile] = useState();

    const handleImg = async e => {

        const form = new FormData();
       

        setFile(e.target.files[0])

        form.append("file", file);
        

        accessClient.post("/api/user/image", form, { 
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        .then(res => {
            alert(res.data);
            document.getElementById("games_img").src = "https://localhost:443/img/" + res.data.url;
        })
    }

    return(
        <>
        <div className="container">
            <div className="title">게임 생성</div>
            <div>
                <div>
                    <img id="games_img" />
                    <input type='file' name='image' onChange={handleImg} />
                </div>
                <div className="input-div">
                    <input type='text' name='name' />
                </div>
                
                <div className="input-div">
                    <input type='text' name='company' />
                </div>
                <div className="input-div">
                    <input type='date' name='release_date' />
                </div>
                <div className="input-div">
                    <div>장르 <button>추가</button></div>
                    <div>

                    </div>
                </div>
                <div className="input-div">
                    <div>플랫폼 <button>추가</button></div>
                    <div>

                    </div>
                </div>
                <div className="input-div">
                    <div>소개말</div>
                    <textarea name='introduction' />
                </div>
                <div><button>추가</button> <button>취소</button></div>
            </div>
        </div>
        </>
    )
}