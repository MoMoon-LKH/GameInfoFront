
import EditorComponent from "./editor"

const createPost = (props) => {
    
    

    return (
        <>
            <div className="container" style={{width: '65%'}}>
                <EditorComponent categoryId={props.match.params.id} />      
            </div>
        </>
    )
}


export default createPost;
