import { useState, useRef } from 'react';
import axios from 'axios';
import './PostUpload.css';


function PostUpload() {
  const [ hashtag, setHashtag ] = useState([]);
  const [ message, setMessage ] = useState('');
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

  const handleChangeMsg = (event) => {
    setMessage(event.target.value);
  }

  const posting = () => {
    // axios.post();
    setHashtag([]);
    setMessage('');
    messagInputRef.current.value = '';
    hashtagInputRef.current.value = '';
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
          onChange={(event) => handleChangeMsg(event)}
        />
        <div id="uploadBtnWrap">
          <button>책 검색</button>
          <button onClick={posting}>등록</button>
        </div>
      </div>
    </div>
  );
}
    
export default PostUpload;  
  
// 게시글 입력하는 컴포넌트입니다.