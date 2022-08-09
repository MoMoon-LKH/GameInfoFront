import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as Header from "./header/header.js"
import Join from "./page/member/join.js"
import Login from "./page/member/login.js"
import Category from "./header/category.js"
import Main from "./page/post/main.js"
import Games from "./page/post/games.js"
import CreatePost from './page/post/createPost.js'
import News from './page/post/news.js';
import Reviews from './page/post/reviews.js';

function App() {
  let user = localStorage.getItem("user");
  
  return (
    <div>
      <Header.Header user={user}></Header.Header>
      <Category></Category>
      <Switch>
        <Route exact path='/'><Main></Main></Route>
        <Route path='/login'><Login></Login></Route>
        <Route path='/join'><Join></Join></Route>
        <Route path='/games'><Games></Games></Route>
        <Route path='/news'><News></News></Route>
        <Route path='/reviews'><Reviews></Reviews></Route>
        <Route path='/post/create'><CreatePost></CreatePost></Route>
      </Switch>
    </div>
  );
}

export default App;
