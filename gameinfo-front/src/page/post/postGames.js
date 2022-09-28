import moment from "moment"
import { Table } from "react-bootstrap"

export default function PostGames({game}) {


    const tdStyle = {
        textAlign: 'center',
        border: '1px solid lightgray',
        width: '20%',
        fontSize: '15px'
    }

    const tdStyle2 = {
        paddingLeft: '20px',
        width: '30%',
        fontSize: '15px'
    }


    return(
        <>
        
        {game !== undefined &&
         <Table style={{border: '1px solid lightgray', borderCollapse: 'collapse'}}>
            <tbody>
                <tr>
                    <td style={{backgroundColor: 'lightgray', paddingLeft: '30px', fontSize: '17px'}} colSpan={4}>{game.name}</td>
                </tr>
                <tr>
                    <td style={tdStyle}>플랫폼</td>
                    <td style={tdStyle2}>{game.platform}</td>
                    <td style={tdStyle}>발매일</td>
                    <td style={tdStyle2}>{moment(game.releaseDate).format('YYYY-MM-DD')}</td>
                </tr>
                <tr>
                    <td style={tdStyle}>장르</td>
                    <td style={tdStyle2}>{game.genres}</td>
                    <td style={tdStyle}>제작사</td>
                    <td style={tdStyle2}>{game.company}</td>
                </tr>
            </tbody>
            </Table>
        }
        </>
    )

}