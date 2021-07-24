import { useState } from 'react';
import axios from 'axios';
import './BookSearchModal.css';

function BookSearchModal({ onModal, setBookInfo }) {
  const [ searchMsg, setSearchMsg ] = useState('');
  const [ searchRes, setSearchRes ] = useState([]);

  const handleChangeSearchMsg = (event) => {
    setSearchMsg(event.target.value);
  }
  const searchRequest = () => {
    if(searchMsg !== ''){
      axios
      .get('https://dapi.kakao.com/v3/search/book', {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`
        },
        params: {
          query: searchMsg,
          sort: "accuracy",
          target: "title"
        }          
      })
      .then((res)=>{
        setSearchRes(res.data.documents);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }

  const handleResultClick = (res) => {
    setBookInfo(res);
    onModal(false);
  }

  return (
    <div id="bookSearchModal">
      <div id="searchInput">
        <input 
          type="text" 
          placeholder="제목을 입력해주세요"
          onChange={(event) => handleChangeSearchMsg(event)}
        />
        <button onClick={searchRequest}>검색</button>
      </div>
      <div id="searchResultWrap">
          <div>검색결과</div>
          <ul id="searchList">
          {
              searchRes.map((res) => {
                return <li key={res.isbn} onClick={() => handleResultClick(res)}>
                    <img src={res.thumbnail} alt="book thumbnail" className="searchThumbnail"/>
                    {/* 검색결과에 img가 없는 경우가 있음, 대체 이미지 필요 */}
                    <div>
                        <div>제목 : {res.title}</div>
                        <div>저자 : {res.authors.join(',')}</div>
                        <div>출판사 : {res.publisher}</div>
                    </div>
                </li>
              })
          }
          </ul>
      </div>
    </div>
  )
}

export default BookSearchModal;