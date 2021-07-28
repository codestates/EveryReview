import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Reviews from "../components/Reviews";
import './Explore.css';

function Explore({ handleTitle, sortByLikes, setSort, getReviewList, reviewList, auth, isLogin }) {
  const [hashInfo, setHashInfo] = useState(null);
  const [hashRank, setRank] = useState(["해시", "태그", "랭킹"]);

  const queryCheck = () => {
    const url = new URL(window.location.href);
    setHashInfo(url.searchParams.get('hashtag'));
    console.log(hashInfo);
  }

  useEffect(() => {
    // 헤더 타이틀 설정
    auth();
    handleTitle('#Explore');
    queryCheck();
    getReviewList(hashInfo);
  }, []);
  
  return (
    <>
      {
        isLogin ?
        <div className="explore">
          {
            hashInfo === null ?
            <ul>
              {
                hashRank.map((el,idx) => {
                  return <li onClick={queryCheck}>
                    <Link to ={`/main/explore?hashtag=${el}`}>{idx+1}. {el}</Link>
                  </li>
                })
              }
            </ul> :
            <Reviews 
              sortByLikes={sortByLikes} 
              setSort={setSort} 
              getReviewList={getReviewList} 
              reviewList={reviewList} 
            />
          }
            
          
        </div> :
        <Redirect to = "/" />
      }
    </>
  );
}
  
export default Explore;  

// 해시태그 모아보기입니다.