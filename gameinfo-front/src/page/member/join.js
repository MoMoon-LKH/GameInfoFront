import './join.css'
import * as Properties from '../../properties.js'
import React, {useState} from "react";
import axios from 'axios'
import { useHistory} from "react-router-dom"

function Join(){

    const history = useHistory();

    const [inputs, setInput] = useState({
        memberId: "",
        password: "",
        name: "",
        nickname: "",
        email: "",
        phone: ""
    });

    const handleChange = e =>{
        setInput({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e =>{

        const url = Properties.API_URL + "/member/join";
        const header = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
        
        axios.post(url, inputs, header)
            .then((result) => {
                alert("가입이 완료되었습니다.");
                history.push("/login");
        
            })
            .catch((e) => {
                alert("가입에 실패");
            })
        
        e.preventDefault();

    }
    
    return (
        <div className="container">
            <form className="join-form" onSubmit={handleSubmit}>
                <div className="join-div">
                    <div className="join-subtitle">아이디</div>
                    <input name='memberId' value={inputs.memberId} onChange={handleChange}  className="join-input" type='text' min={7}/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">비밀번호</div>
                    <input name='password' value={inputs.password} onChange={handleChange} className="join-input" type='password'/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">이름</div>
                    <input name='name' value={inputs.name} onChange={handleChange} className="join-input" type='text'/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">닉네임</div>
                    <input name='nickname' value={inputs.nickname} onChange={handleChange} className="join-input" type='text'/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">이메일</div>
                    <input name='email' value={inputs.email} onChange={handleChange} className="join-input" type='text'/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">휴대전화</div>
                    <input name='phone' value={inputs.phone} onChange={handleChange} className="join-input" type='text'/>
                </div>
                <div className="join-div">
                    <div className="join-button-div">
                        <button type='submit'>가입하기</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Join;
