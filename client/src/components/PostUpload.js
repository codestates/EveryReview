import { useState, useRef } from 'react';
import axios from 'axios';
import './PostUpload.css';


function PostUpload({ onModal, bookInfo, setBookInfo }) {
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
      // axios.post();
      // 넘겨야할 정보
      // 사용자 정보 >> props 받아와야 함 (app.js에서 토큰을 통해 사용자 정보를 받아올 듯?)
      // 게시글 정보 (해시태그, 게시글 내용)
      // 책 정보
      setHashtag([]);
      setMessage('');
      setBookInfo(null);
      setInvalidMsg('');
      messagInputRef.current.value = '';
      hashtagInputRef.current.value = '';
    } 

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