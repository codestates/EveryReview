import './Review.css';
import profile from '../static/profile.png'

function Review({postinfo}) {
  return (
    <div className="review">
      <div className="userImg">
        {
          postinfo.profile === null ?
          <img src={profile} alt="profile alt" /> :
          <img src={postinfo.profile} alt="profile" />
        }
      </div>
      <div className="reviewInWrap">
        <div className="reviewTop">
          <div>{postinfo.username}</div>
          <div>{postinfo.created_at}</div>
          <button id="postMenu">
          &#183;&#183;&#183;
          </button>
        </div>
        <div>
          <div className = "review-contents">
            <a href={postinfo.url}>
              {postinfo.content}
            </a>
          </div>
        </div>
        <div>
          <div className = "hashtag-wrap">
            {
              postinfo.hashtag_name.map((el) => {
                return <div key={el} className = "hashtag">{el}</div>
              })  
            }
          </div>
          <button>{postinfo.likes}</button>
        </div>
      </div>
    </div>
  );
}
    
export default Review;  
  
// 게시글들 나타낼 컴포넌트입니다.