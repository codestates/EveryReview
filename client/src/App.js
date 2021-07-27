/*eslint-disable*/

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
import KakaoLogin from './components/KakaoLogin';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태관리 (true: main, false: landing page redirect)
  const [pageTitle, setPageTitle] = useState(''); // Header title 관리
  const [sortByLikes, setSort] = useState(false); // 정렬 상태 관리
  const [ userInfo, setUserInfo ] = useState({ 
    email: '',
    username: '',
    profile: ''
  }) // 사용자 정보 상태 관리
  const [ accessToken, setAccessToken ] = useState(null) // Access Token 관리
  const [ refreshToken, setRefreshToken ] = useState(null)  // Refresh Token 관리
  const [ reviewList, setReviewList ] = useState([]); // 게시글 list 관리

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
        console.log('응답을 받아오시오', res.body)
        if (res.data.message !== "Userinfo found") {
          alert('로그인을 다시 시도해주세요')
        }
        const { email, username, profile } = res.data.data;
        setUserInfo({
          email: email,
          username: username, 
          profile: profile
        })
      })
      .catch((err)=> {
        console.log('사용자정보를 받아오지 못하면????',err)
      });
  }

  const getReviewList = () => {
    axios
    .post(`${process.env.REACT_APP_END_POINT}/postlist`,{
      data: {
        like: sortByLikes
      }
    },{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((res) => {
      setReviewList(res.data.data);
      // console.log(reviewList);
    })
  }

  useEffect(() => {
    isAuthenticated();
  }, [accessToken])

  return (
    <div id="app">
      <Switch>
        { 
            isLogin ? 
            <Route path='/main'>
              <SideBar/>
              <section id="main">
                <MainHeader pageTitle={pageTitle} />
                <div id="pageWrap">

                  <Route exact path='/main/home'>
                    <Home 
                      handleTitle={setPageTitle} 
                      sortByLikes={sortByLikes} 
                      setSort={setSort}
                      accessToken={accessToken}
                      getReviewList={getReviewList}
                      reviewList={reviewList}
                      />
                  </Route>

                  <Route exact path='/main/explore'>
                    <Explore 
                      handleTitle={setPageTitle} 
                      sortByLikes={sortByLikes} 
                      setSort={setSort}
                      accessToken={accessToken}
                      getReviewList={getReviewList}
                      reviewList={reviewList}
                    />
                  </Route>

                  <Route exact path='/main/mypage'>
                    <MyPage 
                      handleTitle={setPageTitle}
                      userInfo={userInfo}
                      accessToken={accessToken}
                    />
                  </Route>     

                </div>
              </section>
            </Route> :
            <>
              {/* <Redirect to = '/'/> */}
              <Route exact path='/'>
                <Landing />
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
                  setAccessToken={setAccessToken}
                />
              </Route>
          </>
          }

      </Switch>
    </div>
  );
}

export default App;
