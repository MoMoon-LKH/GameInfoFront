import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import "./manage.css"

export default function ManageMain(){

    const linkStyle = {
        textDecoration: "none",
        fontSize: "17px",
        fontWeight: "bold"
    }

    const buttonStyle={
        width: '170px',
        height: '50px',
        margin: "20px",
        color: "white",

        backgroundColor: "gray",
        border: "0px"
    }


    

    return (
        <>
        <div className="container" >
            <div >
            <div className="title" >관리 페이지</div>
            <div className="button-container">
                <div className="button-div"><Link style={linkStyle} to="/manage/game"><button style={buttonStyle}>게임 관리</button></Link></div>
                <div className="button-div"><Link style={linkStyle} to="/manage/platform"><button style={buttonStyle}>플랫폼 관리</button></Link></div>
                <div className="button-div"><Link style={linkStyle} to="/manage/genre"><button style={buttonStyle}>장르 관리</button></Link></div>
            </div>
            </div>
        </div>
        </>
    )
}