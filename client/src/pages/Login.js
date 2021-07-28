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
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const [errMessage, setErrMessage] = useState('');

  // Kakao 로그인 구현
  // useEffect(async () => {
  //   const getAccessToken = async authorizationCode => {
  //   let tokenData = await axios
  //       .post('http://ec2-3-35-205-114.ap-northeast-2.compute.amazonaws.com/oauth', {
  //       authorizationCode,
  //       })
  //       .then(res => {
  //       // console.log(res.data);
  //       let accessToken = res.data.accessToken
  //       // let refreshToken =  // 아마도 refreshToken도 body에 담겨서 올 예정이므로 수정 필요
  //       setAccessToken(accessToken)
  //       setIsLogin(true)
  //       history.push('/main/home')
  //       })
  //       .catch((err)=> {
  //         console.log('카카오로그인에러', err)
  //       })
  //   }
  //   const url = new URL(window.location.href)
  //   const authorizationCode = url.searchParams.get('code')
  //   // setCode(authorizationCode)
  //   console.log('인증 코드', authorizationCode);
  //   if (authorizationCode) {
  //   await getAccessToken(authorizationCode)
  // },[])



  // 이벤트핸들러 함수
  //* input 입력
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
        // err의 status에 따라서 setErrMessage를 보여줘야하는 것 구현완료
        console.log(err)
        if (err.request.status === 401) {
          // 에러코드가 401로 생기면 이메일과 비밀번호 를 다시 확인하라는 메세지가 뜨고
          setErrMessage('이메일과 비밀번호를 다시 확인해주세요')

          // 3초 후에 메세지가 사리지도록 코드구현
          let timer = setTimeout(() => {
            setErrMessage('')
          }, 3000)

          // 버그 방지용 
          return () => { clearTimeout(timer) }
        }
      })
  }

  //* 카카오 로그인 핸들러
  const socialLoginRequestHandler = () => {
    // process.env.REACT_APP_KAKAO_REDIRECT
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=750325bb6d6f5b4a028d5064c28496c8&redirect_uri=http://localhost:3000/login&response_type=code`
    )
  }

<<<<<<< HEAD
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
=======
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
                  :null
                )}
              />
            </div>
          </form>
        </div>
        <div>
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
        {/* 401에러가 발생했을 때 유저에게 보여지는 메세지 */}
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

      {/* 카카오 로그인하기 구현 중 */}
      <div className='btnSocial'>
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