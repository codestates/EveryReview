import Review from "./Review";
import './Reviews.css';

import dummyData from '../static/DummyData'; // test용 dummy data

function Reviews() {
  return (
    <div id="reviews">
      <div id="sortBtnWrap">
        <button>시간 순</button>
        <button>추천 순</button>
      </div>
      <div id="reviewWrap">
        {
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