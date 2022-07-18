import './join.css'


export function Join(){
    
    return (
        <div className="container">
            <div class="join-form">
                <div className="join-div">
                    <div className="join-subtitle">아이디</div>
                    <input className="join-input" type='text'/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">비밀번호</div>
                    <input className="join-input" type='password'/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">이름</div>
                    <input className="join-input" type='text'/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">닉네임</div>
                    <input className="join-input" type='text'/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">이메일</div>
                    <input className="join-input" type='text'/>
                </div>
                <div className="join-div">
                    <div className="join-subtitle">휴대전화</div>
                    <input className="join-input" type='text'/>
                </div>
                <div className="join-div">
                    <div className="join-button-div">
                        <button>가입하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join;

function ajaxJoin(props){
    
}