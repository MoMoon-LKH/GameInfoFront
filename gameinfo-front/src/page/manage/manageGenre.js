import { Link } from "react-router-dom"

export default function ManageGenre(){

    return (
        <>
        <div className="container">
            <div className="title">장르 관리</div>
            <div><Link className="link-txt" to='/manage'>&lt;  관리페이지로</Link></div>
        </div>
        </>
    )
}