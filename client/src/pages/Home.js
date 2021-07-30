import { useState, useEffect } from "react";
import PostUpload from "../components/PostUpload";
import BookSearchModal from "../components/BookSearchModal";
import Reviews from "../components/Reviews";
import './Home.css'
import { Redirect } from "react-router-dom";
import loading from '../static/loading.gif';

function Home({ handleTitle, sortByLikes, setSort, getReviewList, reviewList, auth, isLogin, userInfo, setHashInfo, isLoading }) {
  const [ onModal, setOnModal ] = useState(false);
  const [ bookInfo, setBookinfo ] = useState(null);

  useEffect(() => {
    // 헤더 타이틀 설정
    handleTitle("Home");
    auth();
    setHashInfo([]);
    getReviewList([]);
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
          {
            isLoading ? 
            <img id="loading" src={loading} alt="loading..." /> :
            <Reviews
              sortByLikes={sortByLikes} 
              setSort={setSort} 
              getReviewList={getReviewList} 
              reviewList={reviewList}
              setHashInfo={setHashInfo}
            />
          }
        </div> :
        <Redirect to="/"/>
      }
    </>
  );
}

export default Home;

// 메인페이지(Home)입니다.