

import { useEffect } from 'react';
import './MyPage.css'

function MyPage({handleTitle, userInfo, accessToken }) {

  // 상태관리


  // 이벤트핸들러 함수

  useEffect(() => {
    // 헤더 타이틀 설정
    handleTitle("My Page");
  }, []);
  
  return (
    <div className='myPageContainer'>
      <div className='imgUserProfile'>
        <img 
          src={userInfo.profile}
          alt='user profile'
        />
      </div>
      <div>
        <p>반가워요, {userInfo.username}님!</p>
        <div>이메일: {userInfo.email}</div>
      </div>

      <div className='inputField'>
          <input
            name='password'
            type='password'
            placeholder='비밀번호 입력'
          />
          <input
            name='password'
            type='password'
            placeholder='새로운 비밀번호 입력'
          />  
          <input
            name='password check'
            type='password'
            placeholder='새로운 비밀번호 확인'
          />  
      </div>

      <div className=''>
        <button 
          className=''
        >
          취소
        </button>
        <button 
          className=''
        >
          확인
        </button>
      </div>

    </div>
  );
}

export default MyPage;

// My page 입니다
