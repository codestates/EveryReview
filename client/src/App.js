import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyPage from './pages/MyPage';
import SideBar from './components/SideBar';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Landing from './Landing';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  /* 
    test 용 state
    true >> main/home으로 리다이렉트
    false >> /login으로 리다이렉트
  */
  const [ userInfo, setUserInfo ] = useState({
    email: '',
    username: '',
    img: '',
    accessToken: ''
  })
  const isAuthenticated = () => {
    
  }

  return (
    <div className="app">
      <Switch>

        <Route exact path='/'>
          { isLogin 
            ? <Redirect to='/main/home'/> 
            : <Landing />
          }
        </Route>

        <Route path='/signup'>
          <SignUp 
            setUserInfo={setUserInfo}
            setIsLogin={setIsLogin}
          />
        </Route>
        <Route path='/login'>
          <Login
            setUserInfo={setUserInfo}
            setIsLogin={setIsLogin}
          />
        </Route>

        <Route path='/main'>
          <SideBar/>
          <div className="main">
            <Route path='/main/home'>
              <Home />
            </Route>

            <Route path='/main/explore'>
              <Explore />
            </Route>

            <Route path='/main/mypage'>
              <MyPage />
            </Route>
          </div>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
