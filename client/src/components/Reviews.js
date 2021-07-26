import Review from "./Review";
import axios from "axios";
import { useEffect, useState } from "react";
import dummyData from '../static/DummyData'; // test용 dummy data
import './Reviews.css';

function Reviews({ sortByLikes, setSort }) {
  const [ reviewList, setReviewList ] = useState([]);

  const getReviewList = () => {
    axios
    .post(`${process.env.REACT_APP_END_POINT}/posts`,{
      data: {
        like: sortByLikes
      }
    })
    .then((res) => {
      setReviewList(res.data.posts);
    })
  }

  useEffect(()=>{
    // getReviewList();
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
          // reviewList.length === 0 ?
          // "게시글이 없습니다" :
          // reviewList.map((el) => {
          dummyData.map((el) => {
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