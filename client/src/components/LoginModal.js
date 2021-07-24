import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import './LoginModal.css';

function LoginModal({ loginBtnHandler, signupBtnHandler }) {

  const history = useHistory();

  // 상태관리
  const [ loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const [ errMessage, setErrMessage ] = useState('')

  // 이벤트핸들러 함수
  //* input 입력
  const loginInfoHandler = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value })
  }

  //* 로그인 핸들러
  const loginRequestHandler = () => {
    const endpoint = '';
    const { email, password } = loginInfo;

    axios.post(
      endpoint,
      { email, password },
      { withCredentials: true }
    )
      .then((res) => {
        const { email, username, img, accessToken } = res.data;
        // 데이터를 전달해야하는데, redux를 써야할지 아닐지 고민해보자
        history.push('/main/home')
      })
      .catch((err)=> {
        console.log(err)
        // err의 status에 따라서 setErrMessage를 보여줘야하는 것 구현필요
      })
  }

  //* 카카오 로그인 핸들러
  const socialLoginRequestHandler = () => {
    window.location.assign(
      // url이 들어가야 함. 
    )
  }

    return (
      <div className='loginModalContainer'>
        {/* 로그인 모달창 close btn */}
        <div className=''>
          <button 
            className='btnClose'
            onClick={loginBtnHandler}
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
            type='email'
            placeholder='이메일주소'
            value={loginInfo.email}
            onChange={loginInfoHandler}
          />   
          <input
            name='password'
            type='password'
            placeholder='비밀번호'
            value={loginInfo.password}
            onChange={loginInfoHandler}
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
          계정이 없으신가요? 
          <span
            className='btnModalChange'
            onClick={signupBtnHandler}
          >가입하기</span>
        </div>

        <div className='btnSocial'>
          {/* 카카오로그인 API안내서에 따라서 구현 */}
          {/* <button 
            className='btnSubmit'
            onClick={socialLoginRequestHandler}
          >
            카카오 계정으로 로그인
          </button> */}
          {/* //! 일단 카카오로그인 이미지를 주소로 넣었는데, 이미지소스 처리방식 논의필요 */}
          <img src='https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png' />
        </div>
      </div>
    );
  }
    
export default LoginModal;  

// 로그인 모달창입니다.