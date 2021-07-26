/*eslint-disable*/

import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../components/Logo';
import './Login.css';
import kakao from '../static/kakao_signin.png'

const endpoint = 'http://ec2-3-35-205-114.ap-northeast-2.compute.amazonaws.com';

function Login ({ setIsLogin, setAccessToken }) {

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
    
    const { email, password } = loginInfo;

    axios.post(
      `${endpoint}/signin`,
      { email, password },
      { withCredentials: true }
    )
      .then((res) => {
        const { accessToken } = res.data.data;
        setAccessToken(accessToken)
        setIsLogin(true);
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
      `https://kauth.kakao.com/oauth/authorize?client_id=750325bb6d6f5b4a028d5064c28496c8&redirect_uri=http://localhost:3000/social&response_type=code`
    )
  }

    return (
      <div className='loginContainer'>

        <Logo />
        <div className='inputField'>
          <input
            className='inputSignin'
            name='email'
            type='email'
            placeholder='이메일주소'
            value={loginInfo.email}
            onChange={loginInfoHandler}
          />   
          <input
            className='inputSignin'
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
            className='btnPageChange'
            onClick={()=> history.push('/signup')}
          >가입하기</span>
        </div>

        <div className='btnSocial'>
          {/* 카카오로그인 API안내서에 따라서 구현 */}
          {/* <button s
            className='btnSubmit'
            onClick={socialLoginRequestHandler}
          >
            카카오 계정으로 로그인
          </button> */}
          <img 
            src={kakao}
            onClick={socialLoginRequestHandler}
          />
        </div>
      </div>
    );
  }
    
export default Login ;  

// 로그인 페이지입니다.