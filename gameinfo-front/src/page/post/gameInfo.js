import moment from "moment";


export default function GameInfo(props) {

    const game = props.game

    const infodiv={
        marginTop: '5px',
        marginBottom: '5px'
    }

    return (
        <>
        <div className="gamee-container" style={{textAlign:'center', margin: 'auto', width:'600px', marginTop:'20px'}} >
            
            <div className="game-top" style={{height:' 200px'}}>
                <div className="image-div" style={{float:'left'}}>
                    <img style={{width: '200px', height: '200px'}} src={"/api/all/image/" + game.imgUrl}/>
                </div>
                
                <div className="info-div" style={{display: 'inline-block', textAlign:'left', paddingTop:"30px", width:'350px'}}>
                    <div style={infodiv}>게임명: {game.name}</div>
                    <div style={infodiv}>회사명: {game.company}</div>
                    <div style={infodiv}>발매일: {moment(game.releaseDate).format('YYYY.MM.DD')}</div>
                    <div style={infodiv}>장르: {game.genres}</div>
                    <div style={infodiv}>지원 플랫폼: {game.platform}</div>
                </div>               
            </div>
            
            
        </div>
        </>
    )
}