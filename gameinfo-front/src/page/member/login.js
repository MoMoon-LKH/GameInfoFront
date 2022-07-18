import './login.css'

function Login(){
    return (
        <div className='container'>
            <div className='login-form'>
                <div className='login-div'>
                    <div className='login-text'>로그인</div>
                </div>
                <div className='login-div'>
                    <div><input className='login-input' type='text' placeholder='아이디를 입력해주세요'></input></div>
                </div>
                <div className='login-div'>
                    <div><input className='login-input' type='password' placeholder='비밀번호를 입력해주세요'></input></div>
                </div>
                <div className='login-div'>
                    <div><button>로그인</button></div>
                </div>
            </div>
        </div>
        
    );

}

export default Login;