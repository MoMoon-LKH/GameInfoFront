import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./header/header.js"
import Join from "./page/member/join.js"
import Login from "./page/member/login.js"
import Main from "./page/post/main.js"
import CreatePost from './page/post/createPost.js'
import News from './page/post/news.js';
import Reviews from './page/post/reviews.js';
import ManageMain from './page/manage/manageMain';
import ManageGame from './page/manage/manageGame';
import ManagePlatform from './page/manage/managePlatform';
import ManageGenre from './page/manage/manageGenre';
import CreateGame from './page/manage/createGame';
import ReactModal from 'react-modal';
import Game from './page/manage/game';
import Games from './page/games/games';
import GameDetails from './page/games/gameDetails';
import Post from './page/post/post';
import MainPost from './page/post/mainPost';

function App() {


  return (
    <div>
      <Switch className='body'>
        <Route path='/login'><Login></Login></Route>
        <Route path='/join'><Join></Join></Route>

        <>
        <Header/>
        <Route exact path='/'><Main></Main></Route>
        <Route exact path='/games'><Games></Games></Route>
        <Route path='/games/:id'><GameDetails /></Route>
        <Route path='/news'><News></News></Route>
        <Route path='/reviews'><Reviews></Reviews></Route>
        <Route exact path='/post/create'><CreatePost/></Route>
        <Route exact path='/manage'><ManageMain/></Route>
        <Route exact path='/manage/game'><ManageGame/></Route>
        <Route path='/manage/platform'><ManagePlatform/></Route>
        <Route path='/manage/genre'><ManageGenre/></Route>
        <Route exact path='/manage/game/create'><CreateGame/></Route>
        <Route exact path='/manage/game/info/:id'><Game/></Route>
        <Route exact path='/post/:id' ><Post /></Route>
        <Route exact path='/post/main/:id'><MainPost/></Route>
        </>
        
      </Switch>
    </div>
  );
}

export default App;
