import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyPage from './pages/MyPage';
import SideBar from './components/SideBar';
import MainHeader from './components/MainHeader';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Landing from './Landing';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const [pageTitle, setPageTitle] = useState('');
  const [sortByLikes, setSort] = useState(false);

  /* 
    test 용 state
    true >> main/home으로 리다이렉트
    false >> /login으로 리다이렉트
  */
  const [ userInfo, setUserInfo ] = useState({
    email: '',
    username: '',
    img: '',
  })
  // accessToken 상태관리
  const [ accessToken, setAccessToken ] = useState(null)
  const isAuthenticated = () => {
    axios.get(
      // test용 endpoint
      `http://ec2-3-35-205-114.ap-northeast-2.compute.amazonaws.com/signin`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message !== "Userinfo found") {
          alert('로그인을 다시 시도해주세요')

        }
        const { email, username, profile } = res.data.data.userInfo;
        setUserInfo({
          email, username, profile
        })
      });
  }
  useEffect(() => {
    isAuthenticated();
  }, [])

  return (
    <div id="app">
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
            setIsLogin={setIsLogin}
            setAccessToken={setAccessToken}
          />
        </Route>

        <Route path='/main'>
          <SideBar/>
          <section id="main">
            <MainHeader pageTitle={pageTitle} />
            <div id="pageWrap">
              <Route path='/main/home'>
                <Home handleTitle={setPageTitle} sortByLikes={sortByLikes} setSort={setSort}/>
              </Route>

              <Route path='/main/explore'>
                <Explore handleTitle={setPageTitle} sortByLikes={sortByLikes} setSort={setSort}/>
              </Route>

              <Route path='/main/mypage'>
                <MyPage handleTitle={setPageTitle} />
              </Route>
            </div>
          </section>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
