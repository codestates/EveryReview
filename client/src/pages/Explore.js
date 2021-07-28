import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Reviews from "../components/Reviews";
import './Explore.css';

function Explore({ handleTitle, sortByLikes, setSort, getReviewList, reviewList, auth, isLogin }) {
  const [hashInfo, setHashInfo] = useState([]);
  const [hashRank, setRank] = useState([]);

  const queryCheck = () => {
    const url = new URL(window.location.href);
    setHashInfo(url.searchParams.get('hashtag'));
  }

  const getRank = () => {
    axios
    .get(`${process.env.REACT_APP_END_POINT}/explore`,{
      withCredentials:true
    })
    .then((res) => {
      setRank(res.data.data);
    })
    .catch((err) => {
      console.log(err);      
    })
  }

  useEffect(() => {
    // 헤더 타이틀 설정
    auth();
    handleTitle('#Explore');
    queryCheck();
    getRank();
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