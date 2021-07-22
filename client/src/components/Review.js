import './Review.css';
//postinfo.{변수명}은 서버에서 반환해주는 데이터의 key로 수정해야할 듯합니다
function Review({postinfo}) {
  return (
    <div className="review">
      <div className="bookImg">
        <img src={postinfo.bookImg} alt="book cover" />
      </div>
      <div className="reviewInWrap">
        <div className="reviewTop">
          <div>{postinfo.username}</div>
          <div>{postinfo.createdAt}</div>
          <button>메뉴</button>
        </div>
        <div>
          <div className = "review-contents">{postinfo.contents}</div>
        </div>
        <div>
          <div className = "hashtag-wrap">
            {
              postinfo.hashtag.map(el => {
                return <div className = "hashtag">{el}</div>
              })  
            }
          </div>
          <button>{postinfo.like}</button>
        </div>
      </div>
    </div>
  );
}
    
export default Review;  
  
// 게시글들 나타낼 컴포넌트입니다.