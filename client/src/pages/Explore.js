import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Reviews from "../components/Reviews";
import './Explore.css';
import loading from '../static/loading.gif'

function Explore({ handleTitle, sortByLikes, setSort, getReviewList, reviewList, auth, isLogin, hashInfo, setHashInfo, isLoading, setIsLoading }) {
  const [hashRank, setRank] = useState([]);

  const queryCheck = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams.get('hastag');
    if(params !== null){
      setHashInfo([params]);
    }
  }

  const getRank = () => {
    setIsLoading(true);
    axios
    .get(`${process.env.REACT_APP_END_POINT}/explore`,{
      withCredentials:true
    })
    .then((res) => {
      setRank(res.data.data);
      setIsLoading(false);
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
        <div id="explore">
          {
            hashInfo.length === 0 ?
            isLoading ?
            <img id="loading" src={loading} alt="loading..."/> :
            <>
              <div id="rankingTitle">해시태그 상위노출 Top 10</div>
              <ul id="rankingWrap">
                {
                  hashRank.map((el, idx) => {
                    return <li key={el} onClick={()=>{
                        setHashInfo([el]);
                      }}>
                      <Link to={`/main/explore?hashtag=${el}`}>{el}</Link>
                    </li>
                  })
                }
              </ul>
            </> :
            isLoading ?
            <img id="loading" src={loading} alt="loading..."  /> :
            <>
              <div id="hashtagTitle"># {hashInfo}</div>
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