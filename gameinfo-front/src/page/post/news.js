import { Button } from "bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function News(){



    return (
        <>
        <div className="title" style={{textAlign: 'center'}}>뉴스</div>
        <div className="container" style={{width: "60%", margin: "auto"}}>
            <div>
                <Link to={"/post/create/" + 1} >포스트 작성</Link>
            </div>
        </div>
        </>
    )
}

export default News;