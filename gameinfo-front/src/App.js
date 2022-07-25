import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as Header from "./header/header.js"
import Join from "./page/member/join.js"
import Login from "./page/member/login.js"
import Category from "./header/category.js"
import Main from "./page/post/main.js"
import Games from "./page/post/games.js"

function App() {
  return (
    <div>
      <Header.NotLoginHeader></Header.NotLoginHeader>
      <Category></Category>
      <Switch>
        <Route exact path='/'><Main></Main></Route>
        <Route path='/login'><Login></Login></Route>
        <Route path='/join'><Join></Join></Route>
        <Route path='/games'><Games></Games></Route>
      </Switch>
    </div>
  );
}

export default App;
