import './LoginModal.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

function LoginModal({  }) {
  // 상태관리
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  // 이벤트핸들러 함수
  const loginRequestHandler = () => {
    

  }
  const socialLoginRequestHandler = () => {

  }

    return (
      <div className='loginModalContainer'>
        {/* 로그인 모달창 close btn */}
        <div className=''>
          <button 
            className='btnClose'
          >
            &times;
          </button>
        </div>

        {/* EveryReview BI 삽입 */}
        <div className='imgBI'>
          <img alt='EveryReview BI' />
        </div>

        <div className='inputField'>
          <input
            name='email'
            type='text'
            placeholder='이메일주소'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />   
          <input
            name='password'
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='btnSubmit'>
          <button 
            className='btnSubmit'
            onClick={loginRequestHandler}
          >
            로그인
          </button>
        </div>

        <div className='signupMove'>
          계정이 없으신가요? <Link>가입하기</Link>
        </div>

        <div className='btnSocial'>
          {/* 카카오로그인 API안내서에 따라서 구현 */}
          <button 
            className='btnSubmit'
            onClick={socialLoginRequestHandler}
          >
            카카오 계정으로 로그인
          </button>
        </div>
      </div>
    );
  }
    
export default LoginModal;  

// 로그인 모달창입니다.