import React, {useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyPage from './pages/MyPage';
import Login from './Login';
import SideBar from './components/SideBar';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false); 
  /* 
    test 용 state
    true >> main/home으로 리다이렉트
    false >> /login으로 리다이렉트
  */

  return (
    <div>
      <Switch>

        <Route exact path='/'>
          { isLogin ? <Redirect to='/main/home'/> : <Redirect to='/login' /> /*  test 용  */ }
        </Route>

        <Route exact path='/login'>
          <Login />
        </Route>

        <Route path='/main'>
          <SideBar/>
          <Route path='/main/home'>
            <Home />
          </Route>

          <Route path='/main/explore'>
            <Explore />
          </Route>

          <Route path='/main/mypage'>
            <MyPage />
          </Route>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
