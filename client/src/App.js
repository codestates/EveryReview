import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyPage from './pages/MyPage';
import Login from './Login';
import SideBar from './components/SideBar';
import MainHeader from './components/MainHeader';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [sortByLikes, setSort] = useState(false);
  /* 
    test 용 state
    true >> main/home으로 리다이렉트
    false >> /login으로 리다이렉트
  */

  return (
    <div id="app">
      <Switch>

        <Route exact path='/'>
          { isLogin 
            ? <Redirect to='/main/home'/> 
            : <Login /> /*  test 용  */ 
          }
        </Route>

        {/* 위 코드로 수정 '/login' 경로 삭제
        <Route exact path='/login'>
          <Login />
        </Route> */}

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
