import SideBar from "../components/SideBar";
import MainHeader from "../components/MainHeader";
import Home from "./Home";
import Explore from "./Explore";
import MyPage from "./MyPage";
import { useState } from "react";
import { Route } from 'react-router-dom';
import axios from "axios";

function Main({ isLogin, setIsLogin, userInfo, setUserInfo, auth }) {
  const [ pageTitle, setPageTitle ] = useState(''); // Header title 관리
  const [ reviewList, setReviewList ] = useState([]); // 게시글 list 관리
  const [ hashInfo, setHashInfo ] = useState([]); // 선택된 Hashtag 관리
  const [ isLoading, setIsLoading ] = useState(true);

  const getReviewList = (hashInfo) => {
    setIsLoading(true);
    axios
    .post(`${process.env.REACT_APP_END_POINT}/postlist`,{
      data: {
        hashInfo : hashInfo
      }
    },{
      withCredentials: true,
    })
    .then((res) => {
      setReviewList(res.data.data);
      setIsLoading(false);
    })
  }

  return (
    <>
      <SideBar setUserInfo={setUserInfo} setIsLogin={setIsLogin}/>
      <section id="main">
        <MainHeader pageTitle={pageTitle} />
        <div id="pageWrap">
          <Route exact path='/main/home'>
            <Home 
              handleTitle={setPageTitle} 
              getReviewList={getReviewList}
              reviewList={reviewList}
              userInfo={userInfo}
              auth={auth}
              isLogin={isLogin}
              hashInfo={hashInfo}
              setHashInfo={setHashInfo}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Route>

          <Route path='/main/explore'>
            <Explore 
              handleTitle={setPageTitle} 
              getReviewList={getReviewList}
              reviewList={reviewList}
              auth={auth}
              isLogin={isLogin}
              hashInfo={hashInfo}
              setHashInfo={setHashInfo}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Route>

          <Route exact path='/main/mypage'>
            <MyPage 
              handleTitle={setPageTitle}
              userInfo={userInfo}
              auth={auth}
              isLogin={isLogin}
            />
          </Route>     
        </div>
      </section>    
    </>
  )
}

export default Main;