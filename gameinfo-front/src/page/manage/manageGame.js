import { Link } from "react-router-dom"

export default function ManageGame(){

    return (
        <>
        <div className="container">
            <div className="title">게임 관리</div>
            <div><Link className="link-txt" to='/manage'>&lt; 관리페이지로</Link></div>
            <div><Link className="link-txt" to='/manage/game/create'>추가</Link></div>
        </div>
        </>
    )
}