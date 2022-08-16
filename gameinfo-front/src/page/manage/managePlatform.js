import { Link } from "react-router-dom"

export default function ManagePlatform(){

    return (
        <>
        <div className="container">
            <div>
                <div className="title">플랫폼 관리</div>
                <div><Link className="link-txt" to='/manage'>&lt;  관리페이지로</Link></div>
            </div>
        </div>
        </>
    )
}