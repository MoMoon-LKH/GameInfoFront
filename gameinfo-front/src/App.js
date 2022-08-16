import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./header/header.js"
import Join from "./page/member/join.js"
import Login from "./page/member/login.js"
import Main from "./page/post/main.js"
import Games from "./page/post/games.js"
import CreatePost from './page/post/createPost.js'
import News from './page/post/news.js';
import Reviews from './page/post/reviews.js';
import ManageMain from './page/manage/manageMain';

function App() {


  return (
    <div>
      <Switch className='body'>
        <Route path='/login'><Login></Login></Route>
        <Route path='/join'><Join></Join></Route>

        <>
        <Header/>
        <Route exact path='/'><Main></Main></Route>
        <Route path='/games'><Games></Games></Route>
        <Route path='/news'><News></News></Route>
        <Route path='/reviews'><Reviews></Reviews></Route>
        <Route path='/post/create'><CreatePost></CreatePost></Route>
        <Route path='/manage'><ManageMain/></Route>
        </>
      
      </Switch>
    </div>
  );
}

export default App;
