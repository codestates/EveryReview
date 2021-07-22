import './PostUpload.css';

function PostUpload() {
  return (
    <div className="postUpload">
      <div className="userProfile">
        <img src="https://randomuser.me/api/portraits/men/98.jpg" alt="user profile" />
      </div>
      <div className="uploadInputWrap">
        <input type="text" placeholder="text your hashtag"/>
        <input type="text" maxLength="40" placeholder="text your message"/>
        <div className="uploadBtnWrap">
          <button>책 검색</button>
          <button>등록</button>
        </div>
      </div>
    </div>
  );
}
    
export default PostUpload;  
  
// 게시글 입력하는 컴포넌트입니다.