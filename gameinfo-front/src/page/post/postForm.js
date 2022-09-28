import moment from "moment";


export default function PostForm({post, member}){


    return (
        <>
        <div className="post-div post-title">
                        {post.title}
        </div>
        <div className="post-header">
            <div className="post-div">
                <span>작성자: </span><span>{member.nickname}</span>
            </div>
            <div className="post-div">
                <span>작성일: </span><span>{moment(post.createDate).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
        </div>
        <div className="post-content">
            <div dangerouslySetInnerHTML={{__html: post.content}}>
            </div>
        </div>
        </>
    )
}