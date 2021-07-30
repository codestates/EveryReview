import Review from "./Review";
import { useEffect } from "react";
import './Reviews.css';

function Reviews({ reviewList, setHashInfo }) {
  return (
    <div id="reviews">
      <div id="reviewWrap">
        {
          reviewList.length === 0 ?
          "게시글이 없습니다" :
          reviewList.map((el) => {
            return <Review 
              key = {el.id}
              postinfo = {el}
              setHashInfo = {setHashInfo}
            />;
          })
        }
      </div>
    </div>
  );
}
    
export default Reviews;  
  
// 게시글들 나타낼 컴포넌트입니다.