import PostUpload from "../components/PostUpload";
import Reviews from "../components/Reviews";
import './Home.css'
/*
  1) 한번에 몇 개의 게시물을 나타낼지?
  2) 페이지 형식? 무한 스크롤 형식?
*/
function Home() {
  return (
    <div className="home">
      <PostUpload />
      <Reviews />
    </div>
  );
}

export default Home;

// 메인페이지(Home)입니다.