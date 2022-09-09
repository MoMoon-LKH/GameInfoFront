import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import GameInfo from "../post/gameInfo";
import PostList from "../post/postList";

export default function GameDetails(props) {

    const history = useHistory();
    const location = useLocation();
    const game = location.state.game;
    const [categorySelect, setCategorySelect] = useState({
        id: '',
        name: ''
    });

    
    
    const handleCategory = (id, name) => {
        setCategorySelect({
            id: parseInt(id),
            name: name
        });
    }


    
   
    return (
        <>
        <div className="container"> 
            <GameInfo game={game}></GameInfo>
            <div>
                <div onClick={() => handleCategory(0, '게임 정보')}>게임 정보</div>
                <div onClick={() => handleCategory(1, '뉴스')}>뉴스</div>
                <div onClick={() => handleCategory(2, '리뷰')}>리뷰</div>
                <div onClick={() => handleCategory(3, '공략/팁')}>공략/팁</div>
                <div onClick={() => handleCategory(4, '자유게시판')}>자유게시판</div>
            </div>
            <div className="cotent">
                {renderSwitch(categorySelect, game)}
            </div>
        </div>
        
        </>
    )
}

function renderSwitch(category, game){
    switch(category.id) {
        case 0:
            return (
                <>
                    <div>
                        <div>게임 소개</div>
                        <div>
                            {game.introduction}
                        </div>
                    </div>
                </>
            )
        
        case 1:
            return (
                <>
                    <div>
                        <PostList category={category} gameId={game.id} />
                    </div>
                </>
            )

        case 2:
            return (
                <>
                    <div>
                        리뷰
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
}
