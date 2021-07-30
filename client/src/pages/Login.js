import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import KakaoLogin from '../components/KakaoLogin';
import Logo from '../components/Logo';
import './Login.css';
import kakao from '../static/kakao_signin.png'
import { RiLockPasswordLine } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'

axios.defaults.withCredentials = true;


function Login({ setIsLogin }) {
  const history = useHistory();

  // 상태관리
  //* 로그인 시 사용자가 입력하는 정보
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  //* 입력하는 정보에 따른 에러메세지
  const [errMessage, setErrMessage] = useState('');

  // 이벤트핸들러 함수
  //* 입력하는 정보 핸들러
  const loginInfoHandler = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value })
  }

  //* 로그인 핸들러
  const loginRequestHandler = (event) => {

    const { email, password } = loginInfo;

    axios
      .post(`${process.env.REACT_APP_END_POINT}/signin`, {
        //payload 
        email,
        password
      },
        {
          //header
          withCredentials: true
        }
      )
      .then((res) => {
        setIsLogin(true);
        history.push('/main/home')
      })
      .catch((err) => {
        console.log(err)
        if (err.request.status === 401) {
          // 에러코드가 401로 생기면 이메일과 비밀번호 를 다시 확인하라는 메세지가 뜨고
          setErrMessage('이메일과 비밀번호를 다시 확인해주세요')

          // 3초 후에 메세지가 사리지도록 코드구현
          let timer = setTimeout(() => {
            setErrMessage('')
          }, 3000)
          // setTimeout 함수가 끝나기 전에 페이지를 이동할 때 발생할 수 있는 버그 방지용 
          return () => { clearTimeout(timer) }
        }
      })
  }

  //* 카카오 로그인 핸들러
  const socialLoginRequestHandler = () => {

    window.location.assign(
      process.env.REACT_APP_KAKAO_REDIRECT
    )
  }

  return (
    <div className='loginContainer'>

      <Logo />
      <div className='inputField'>
        <form>
          <div className='inputWrap'>
            <HiOutlineMail className='memberIcon' />
            <input
              className='inputSignin'
              name='email'
              type='email'
              placeholder='이메일주소'
              value={loginInfo.email}
              onChange={loginInfoHandler}
            />
          </div>
          <div className='inputWrap'>
            <RiLockPasswordLine className='memberIcon' />
            <input
              className='inputSignin'
              name='password'
              type='password'
              placeholder='비밀번호'
              value={loginInfo.password}
              onChange={loginInfoHandler}
              // enter로 정보를 submit
              onKeyUp={(event) => (
                event.key === 'Enter'
                  ? loginRequestHandler(event)
                  : null
              )}
            />
          </div>
        </form>
      </div>
      <div>
        {/* 401에러가 발생했을 때 유저에게 보여지는 메세지 위치 */}
        {
          errMessage &&
          <p className='errMessage'>{errMessage}</p>
        }
      </div>
      <div>
        <button
          className='btnSubmit'
          onClick={loginRequestHandler}
        >
          로그인
        </button>
      </div>

      <div>
        <img
          className='btnSocial'
          src={kakao}
          alt='카카오로 로그인'
          onClick={socialLoginRequestHandler}
        />
        <KakaoLogin
          setIsLogin={setIsLogin}
        />
      </div>

      <div className='signupMove'>
        계정이 없으신가요? &nbsp;&nbsp;
        <span
          className='btnPageChange'
          onClick={() => history.push('/signup')}
        >가입하기</span>
      </div>
    </div>
  );
}

export default Login;

// 로그인 페이지입니다.