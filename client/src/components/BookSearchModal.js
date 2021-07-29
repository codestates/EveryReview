import { useState } from 'react';
import axios from 'axios';
import './BookSearchModal.css';
import thumbnail from '../static/book.png';
import loading from '../static/loading.gif';

function BookSearchModal({ onModal, setBookInfo }) {
  const [ searchMsg, setSearchMsg ] = useState('');
  const [ searchRes, setSearchRes ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const handleChangeSearchMsg = (event) => {
    setSearchMsg(event.target.value);
  }
  const searchRequest = () => {
    setIsLoading(true);
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
        }, 
        withCredentials: false 
      })
      .then((res)=>{
        setSearchRes(res.data.documents);
        setIsLoading(false);
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
    <div id="bookSearchModalWrap">
      <div id="modalBack" onClick={()=>onModal(false)}></div>
      <div id="bookSearchModal">
        <div id="modalCloseBtn" onClick={()=>onModal(false)}>X</div>
        <div id="searchInputWrap">
          <input
            id="searchInput"
            type="text" 
            placeholder="제목을 입력해주세요"
            onChange={(event) => handleChangeSearchMsg(event)}
            onKeyUp={(event)=> event.key === 'Enter' ? searchRequest() : null }
          />
          <button id='btnSearch' onClick={searchRequest}>
            검색
          </button>
        </div>
        <div id="searchResultWrap">
          {
            isLoading ?
            <img src={loading} alt="loading..."/> :
            searchRes.length === 0
            ? <div className='resultBookSearch'>나타낼 결과가 없습니다!</div>
            :<ul id="searchList">
              {
                  searchRes.map((res) => {
                    return <li key={res.isbn} onClick={() => handleResultClick(res)}>
                      {
                        res.thumbnail === "" ?
                        <img src={thumbnail} alt="alt thumbnail" className="searchThumbnail"/> :
                        <img 
                          src={res.thumbnail} 
                          alt={res.thumbnail}  className="searchThumbnail"
                        />
                      }
                        {/* 검색결과에 img가 없는 경우가 있음, 대체 이미지 필요 */}
                        <div className='bookInfo'>
                            <div>제목 : {res.title}</div>
                            <div>저자 : {res.authors.join(',')}</div>
                            <div>출판사 : {res.publisher}</div>
                        </div>
                    </li>
                  })
              }
            </ul>
          }
        </div>
      </div>
      </div>
  )
}

export default BookSearchModal;