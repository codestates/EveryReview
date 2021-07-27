import Review from "./Review";
import axios from "axios";
import { useEffect, useState } from "react";
import dummyData from '../static/DummyData'; // test용 dummy data
import './Reviews.css';

function Reviews({ sortByLikes, setSort, getReviewList, reviewList }) {

  useEffect(()=>{
    getReviewList();
  }, [sortByLikes]);

  return (
    <div id="reviews">
      <div id="sortBtnWrap">
        <button 
          className={ sortByLikes ? "sortBtn" : "sortBtn selected" }
          onClick={ () => setSort(false) }
        >
          시간 순
        </button>
        <button 
          className={ sortByLikes ? "sortBtn selected" : "sortBtn" }
          onClick={ () => setSort(true) }
        >
          추천 순
        </button>
      </div>
      <div id="reviewWrap">
        {
          reviewList.length === 0 ?
          "게시글이 없습니다" :
          reviewList.map((el) => {
            return <Review 
              key = {el.id}
              postinfo = {el}
            />;
          })
        }
      </div>
    </div>
  );
}
    
export default Reviews;  
  
// 게시글들 나타낼 컴포넌트입니다.