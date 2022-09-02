import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Games from "../post/games";
import GameInfo from "../post/gameInfo";


export default function Game() {

    const location = useLocation();
    const history = useHistory();
    const game = location.state.game;


    const handleUpdate = () => {

    }

    const handleBack = e => {
        
        history.goBack();
        e.preventDefault();
    }
    
    return (
        <>
        <div className="title" style={{textAlign: 'center'}}>게임 관리</div>
        <GameInfo game={game}/>
        <div className="btn-divs" style={{textAlign: 'center'}}>
            <div>
                <button onClick={handleUpdate}>수정</button> <button onClick={handleBack}>뒤로</button>
            </div>
        </div>
            
            
        </>
    )

}