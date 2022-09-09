import axios from "axios";
import { useEffect, useState } from "react"
import { useHistory ,useLocation, useParams } from "react-router-dom";
import Games from "../games/games";
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
        <div className="game-bottom" style={{textAlign:'left', marginLeft: '20px', marginTop: "20px"}}>
                <div className="introduction-title">
                    소개글
                </div>
                <textarea style={{width:'600px', height: '100px', marginTop: '7px', resize: "none"}} defaultValue={game.introduction} readOnly/>
               
            </div>
        <div className="btn-divs" style={{textAlign: 'center'}}>
            <div>
                <button onClick={handleUpdate}>수정</button> <button onClick={handleBack}>뒤로</button>
            </div>
        </div>
       
            
            
        </>
    )

}