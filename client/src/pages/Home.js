import { useState } from "react";
import PostUpload from "../components/PostUpload";
import BookSearchModal from "../components/BookSearchModal";
import Reviews from "../components/Reviews";
import './Home.css'
/*
  1) 한번에 몇 개의 게시물을 나타낼지?
  2) 페이지 형식? 무한 스크롤 형식?
*/
function Home() {
  const [ onModal, setOnModal ] = useState(false);
  const [ bookInfo, setBookinfo ] = useState(null);

  return (
    <div className="home">
      <PostUpload onModal={setOnModal} bookInfo={bookInfo} setBookInfo={setBookinfo} />
      {
        onModal ? <BookSearchModal onModal={setOnModal} setBookInfo={setBookinfo} /> : null
      }
      <Reviews />
    </div>
  );
}

export default Home;

// 메인페이지(Home)입니다.