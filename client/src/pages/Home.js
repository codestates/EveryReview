import { useState, useEffect } from "react";
import PostUpload from "../components/PostUpload";
import BookSearchModal from "../components/BookSearchModal";
import Reviews from "../components/Reviews";
import './Home.css'
import { Redirect } from "react-router-dom";
/*
  1) 한번에 몇 개의 게시물을 나타낼지?
  2) 페이지 형식? 무한 스크롤 형식?
*/
function Home({ handleTitle, sortByLikes, setSort, getReviewList, reviewList, auth, isLogin, userInfo }) {
  const [ onModal, setOnModal ] = useState(false);
  const [ bookInfo, setBookinfo ] = useState(null);

  useEffect(() => {
    // 헤더 타이틀 설정
    handleTitle("Home");
    auth();
  }, []);

  return (
    <>
      {
        isLogin ?
        <div id="home">
          <PostUpload 
            onModal={setOnModal} 
            bookInfo={bookInfo} 
            setBookInfo={setBookinfo} 
            getReviewList={getReviewList} 
            userInfo={userInfo}
          />
          {
            onModal ? <BookSearchModal onModal={setOnModal} setBookInfo={setBookinfo}/> : null
          }
          <Reviews
            sortByLikes={sortByLikes} 
            setSort={setSort} 
            getReviewList={getReviewList} 
            reviewList={reviewList}
          />
        </div> :
        <Redirect to="/"/>
      }
    </>
  );
}

export default Home;

// 메인페이지(Home)입니다.