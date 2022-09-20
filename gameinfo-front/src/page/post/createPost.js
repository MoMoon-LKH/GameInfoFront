
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditorComponent from "./editor"

export default function CreatePost(props) {
    
    const location = useLocation();
    const category = location.state.category;
    const game = location.state.game
    const history = useHistory();

    const gamePage = () => {
        history.push({
            pathname: '/games/' + game.id,
            state: {
                game: game
            }
        })
    }

    return (
        <>
            <div className="container" style={{width: '65%'}}>
                <div className="category-title" style={{textAlign: 'left'}}><span onClick={gamePage}>{game.name} &gt;</span></div>
                <EditorComponent categoryId={category.id} gameId={game.id}/>      
            </div>
        </>
    )
}


