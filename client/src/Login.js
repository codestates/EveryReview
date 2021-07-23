import React, { useState } from 'react';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import './Login.css';

function Login() {
  // 상태관리
  const [isLoginModal, setIsLoginModal] = useState(false)
  const [isSignupModal, setIsSignupModal] = useState(false)
  
  // 이벤트 핸들러함수
  const loginBtnHandler = () => {
    setIsLoginModal(!isLoginModal)
    setIsSignupModal(false) // 모달창 두 개가 한꺼번에 열리는 것 방지
  }
  const signupBtnHandler = () => {
    setIsSignupModal(!isSignupModal)
    setIsLoginModal(false) // 모달창 두 개가 한꺼번에 열리는 것 방지
  }


  return (
    <div className='loginContainer'>
      <div className='imgBI'>
        <img alt='EveryReview BI' />
      </div>
      <div className=''>
        <button 
          className=''
          onClick={loginBtnHandler}
        >
          로그인
        </button>
      </div>
      <div className=''>
        <button 
          className=''
          onClick={signupBtnHandler}
        >
          회원가입
        </button>
      </div>
      {
        isLoginModal
        ? <LoginModal />
        : null
      }
      {
        isSignupModal
        ? <SignUpModal />
        : null
      }
    </div>
  );
}

export default Login;

// 로그인 페이지 입니다