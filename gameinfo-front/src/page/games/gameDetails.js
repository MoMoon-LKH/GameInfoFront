import { useEffect } from "react";
import { useState } from "react";
import { NavLink, Switch } from "react-router-dom";
import { Route, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import GameInfo from "../post/gameInfo";
import PostList from "../post/postList";
import GamesFree from "./gamesFree";
import GamesNews from "./gamesNews";
import GamesReviews from "./gamesReview";
import GamesTips from "./gamesTip";

export default function GameDetails(props) {

    const history = useHistory();
    const location = useLocation();
    const game = location.state.game;
    const giveGame = {
        id: game.id,
        name: game.name
    }

    const liStyle = {
        display: 'inline',
        float: 'left',
        width: '120px',
        height: '35px',
        margin: '10px 0',
        paddingTop: '5px',
    }
    
    
    


    
   // 탭으로 각 페이지 
    return (
        <>
        <div className="title" style={{textAlign: 'center'}}>게임 목록</div>
        <div className="container"> 
        
            <GameInfo game={game}></GameInfo>

            <div className="game-category">
                <ul style={{listStyleType: 'none', display: "inline-block", textAlign: 'center'}}>
                    <li className="game-li" style={liStyle}>
                        <NavLink to={{
                            pathname:'/games/info',
                            state: {
                                game: game
                            }
                        }}>게임 정보</NavLink></li>
                        <li className="game-li" style={liStyle}>
                            <NavLink to={{
                                pathname:'/games/news',
                                state: {
                                    game: game
                                }
                        }}>뉴스</NavLink></li>
                    <li className="game-li" style={liStyle} ><NavLink to={{
                            pathname:'/games/reviews',
                            state: {
                                game: game
                            }
                        }}>리뷰</NavLink></li>
                    <li className="game-li" style={liStyle} ><NavLink to={{
                            pathname:'/games/tips',
                            state: {
                                game: game
                            }
                        }}>공략/팁</NavLink></li>
                    <li className="game-li" style={liStyle} ><NavLink to={{
                            pathname:'/games/freeboard',
                            state: {
                                game: game
                            }
                        }}>자유게시판</NavLink></li>
                </ul>
            </div>
           
            <Switch>
                <Route path='/games/info'>
                    <div>게임소개 </div>
                    {game.introduction}
                </Route>
                <Route path="/games/news">
                    <div>뉴스</div>
                    <GamesNews game={game}/>
                </Route>
                <Route path="/games/reviews">
                    <div>리뷰</div>
                    <GamesReviews game={game} />

                </Route>
                <Route path="/games/tips">
                    <div>공략/팁</div>
                    <GamesTips game={game} />
                </Route>
                <Route path="/games/freeboard">
                    <div>자유게시판</div>
                    <GamesFree game={game} />
                </Route>

            </Switch>
            
        </div>
        
        </>
    )
}
/* 
function renderSwitch(category, game){
    switch(category.id) {
        case 0:
            return (
                <>
                    
                </>
            )
        
        case 1:

        case 2:
            return (
                <>
                    <div>
                        <PostList category={category} game={game}/>
                    </div>
                </>
            )
        case 3:
            return (
                <>
                    <div>
                        공략/팁
                    </div>
                </>
            )
        case 4:
        return (
            <>
                <div>
                    자유게시판
                </div>
            </>
        )
    } 
}*/
