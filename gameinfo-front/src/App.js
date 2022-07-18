import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as Header from "./header/header.js"
import Join from "./page/member/join.js"
import Login from "./page/member/login.js"

function App() {
  return (
    <div>
      <Header.NotLoginHeader></Header.NotLoginHeader>
      
      <Switch>
        <Route exact path='/'>Home</Route>
        <Route path='/login'><Login></Login></Route>
        <Route path='/join'><Join></Join></Route>
      </Switch>
    </div>
  );
}

export default App;
