/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Landing from './Landing';
import Main from './pages/Main';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태관리 (true: main, false: landing page redirect)
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    profile: ''
  }) // 사용자 정보 상태 관리
  const history = useHistory();

  const isAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_END_POINT}/signin`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data.data);
        setIsLogin(true);
      })
      .catch((err) => {
        console.log("액세스 토큰 만료, 다시 로그인하세요");
        setIsLogin(false);
      });
  }

  useEffect(() => {
    if (isLogin) history.push("/main/home");
    else history.push("/");
  }, [isLogin])

  return (
    <div id="app">
      <Switch>

        <Route exact path='/'>
          <Landing auth={isAuthenticated} />
        </Route>

        <Route exact path='/signup'>
          <SignUp
            setUserInfo={setUserInfo}
            setIsLogin={setIsLogin}
          />
        </Route>

        <Route exact path='/login'>
          <Login
            setIsLogin={setIsLogin}
          />
        </Route>

        <Route path='/main'>
          <Main
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            auth={isAuthenticated}
            history={history}
          />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
