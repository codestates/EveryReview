import Reviews from "../components/Reviews";
import './Explore.css';

function Explore() {
  return (
    <div className="explore">
      <div>
        {/* 
         해당 Hashtag를 렌더링해야한다 
         해당 Hashtag가 선택되지 않은 상태에선 뭘 렌더링해야하나..?
         */}
        <div>#Hashtag</div>
      </div>
      <Reviews />
    </div>
  );
}
  
export default Explore;  

// 해시태그 모아보기입니다.