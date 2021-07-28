import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Reviews from "../components/Reviews";
import './Explore.css';

function Explore({ handleTitle, sortByLikes, setSort, getReviewList, reviewList, auth, isLogin, hashInfo, setHashInfo }) {
  const [hashRank, setRank] = useState([]);

  const queryCheck = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams.get('hastag');
    if(params !== null){
      setHashInfo([params]);
    }
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
    // getReviewList(hashInfo);
  },[]);

  useEffect(()=>{
    getReviewList(hashInfo);
  },[hashInfo])
  
  return (
    <>
      {
        isLogin ?
        <div className="explore">
          {
            hashInfo.length === 0 ?
            <ul>
              {
                hashRank.map((el, idx) => {
                  return <li key={el} onClick={()=>setHashInfo([el])}>
                    <Link to={`/main/explore?hashtag=${el}`}>{idx+1}. {el}</Link>
                  </li>
                })
              }
            </ul> :
            <>
              <div>{hashInfo}</div>
              <Reviews 
                sortByLikes={sortByLikes} 
                setSort={setSort} 
                getReviewList={getReviewList} 
                reviewList={reviewList}
                setHashInfo={setHashInfo}
              />
            </>
          }
            
          
        </div> :
        <Redirect to = "/" />
      }
    </>
  );
}
  
export default Explore;  

// 해시태그 모아보기입니다.