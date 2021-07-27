import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Reviews from "../components/Reviews";
import './Explore.css';

function Explore({ handleTitle, sortByLikes, setSort, getReviewList, reviewList, auth, isLogin }) {
  
  useEffect(() => {
    // 헤더 타이틀 설정
    console.log("EXP");
    handleTitle('#Explore');
    auth();
  }, []);
  
  return (
    <>
      {
        isLogin ?
        <div className="explore">
          <div>
            {/* 
            해당 Hashtag를 렌더링해야한다 
            해당 Hashtag가 선택되지 않은 상태에선 뭘 렌더링해야하나..?
            */}
            <div>#Hashtag</div>
          </div>
          <Reviews 
            sortByLikes={sortByLikes} 
            setSort={setSort} 
            getReviewList={getReviewList} 
            reviewList={reviewList} 
          />
        </div> :
        <Redirect to = "/" />
      }
    </>
  );
}
  
export default Explore;  

// 해시태그 모아보기입니다.