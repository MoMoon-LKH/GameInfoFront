import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom";
import Games from "../post/games";
import GameInfo from "./gameInfo";


export default function Game() {

    const location = useLocation();
    const game = location.state.game;

    
    return (
        <>
        <div className="title" style={{textAlign: 'center'}}>게임 관리</div>
        <GameInfo game={game}/>
        <div className="btn-divs" style={{textAlign: 'center'}}>
            <div>
                <button>수정</button> <button>뒤로</button>
            </div>
        </div>
            
            
        </>
    )

}