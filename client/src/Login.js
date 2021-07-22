import React from 'react';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import './Login.css';

function Login() {
  // 상태관리


  // 이벤트 핸들러함수


  return (
    <div className='loginContainer'>
      <div className='imgBI'>
        <img alt='EveryReview BI' />
      </div>
      <div className=''>
        <button className=''>
          로그인
        </button>
      </div>
      <div className=''>
        <button className=''>
          회원가입
        </button>
      </div>
      {/* test용 */}
      <SignUpModal />
      <LoginModal />
    </div>
  );
}

export default Login;

// 로그인 페이지 입니다