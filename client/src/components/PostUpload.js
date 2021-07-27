import { useState, useRef } from 'react';
import axios from 'axios';
import './PostUpload.css';


function PostUpload({ onModal, bookInfo, setBookInfo, accessToken, getReviewList }) {
  const [ hashtag, setHashtag ] = useState([]);
  const [ message, setMessage ] = useState('');
  const [ invalidMsg, setInvalidMsg ] = useState('');
  const messagInputRef = useRef(null);
  const hashtagInputRef = useRef(null);
  
  const addHashtag = (event) => {
    const filtered = hashtag.filter((el) => el === event.target.value);

    if(event.target.value !== '' && filtered.length === 0){
      setHashtag([...hashtag, event.target.value]);
    }

    event.target.value = '';
  }

  const deleteHashtag = (clickIndex) => {
    setHashtag(() => {
      return hashtag.filter(( _, index ) => {
        return index !== clickIndex;
      })
    });
  }

  const posting = () => {
    if(bookInfo !== null && message !== ''){
      // 게시글 등록 post 요청

      /*
      넘겨야할 정보
        게시글 정보 (해시태그, 게시글 내용)
        책 정보
      */

      axios
      .post(`${process.env.REACT_APP_END_POINT}/post`, {
        data: {
          postInfo: {
            content: message, // String
            hashtag //String []
          },
          bookInfo: {
            title: bookInfo.title,  // String
            thumbnail: bookInfo.thumbnail,  // String
            contents: bookInfo.contents,  // String
            isbn: bookInfo.isbn,  // String
            publisher: bookInfo.publisher,  // String
            authors: bookInfo.authors,  // String []
            url: bookInfo.url // String
          }
        }
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(() => {
        // 게시글 리스트 갱신 함수
        getReviewList();
      })
      .catch(() => {

      });
      

      // State 초기화
      setHashtag([]);
      setMessage('');
      setBookInfo(null);
      setInvalidMsg('');

      // Input value 초기화
      messagInputRef.current.value = '';
      hashtagInputRef.current.value = '';
    } 

    // 유효 입력 메시지 설정
    if(message === ''){
      setInvalidMsg('한줄평을 입력해주세요')
    } else if(bookInfo === null){
      setInvalidMsg('도서를 선택해 주세요')
    }


  }

  return (
    <div id="postUpload">
      <div id="userProfile">
        <img src="https://randomuser.me/api/portraits/men/98.jpg" alt="user profile" />
        {/* 프로필 대체 이미지 필요 */}
      </div>
      <div id="uploadInputWrap">
        <div id="hashtagInput">
         <ul>
            {
              hashtag.map(( el, index ) => <li key={index} onClick={() => deleteHashtag(index)}>{el}</li>)
            }
          </ul>
          <input 
            type="text" 
            ref={messagInputRef}
            placeholder="text your hashtag" 
            onKeyUp={(event) => event.key === 'Enter' ? addHashtag(event) : null}
          />
        </div>
        <input 
          type="text" 
          ref={hashtagInputRef}
          maxLength="40" 
          placeholder="text your message"
          onChange={(event) => setMessage(event.target.value)}
        />
        <div id="uploadBottom">
          <div>
            선택된 도서 : {
              bookInfo !== null ? bookInfo.title : "없음"
            }
          </div>
          <div id="uploadBtnWrap">
            <div>{invalidMsg}</div>
            <button onClick={() => onModal(true)}>도서 검색</button>
            <button onClick={posting}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}
    
export default PostUpload;  
  
// 게시글 입력하는 컴포넌트입니다.