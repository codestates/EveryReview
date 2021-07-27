/*eslint-disable*/

import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import './Login.css';
import kakao from '../static/kakao_signin.png'

axios.defaults.withCredentials = true;


function Login ({ setIsLogin, setAccessToken }) {
  const history = useHistory();

  // 상태관리
  const [ loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const [ errMessage, setErrMessage ] = useState('');
  const [ code, setCode ] = useState(null)

  // Kakao 로그인 구현
  useEffect(async () => {
    const getAccessToken = async authorizationCode => {
    let tokenData = await axios
        .post('http://ec2-3-35-205-114.ap-northeast-2.compute.amazonaws.com/oauth', {
        authorizationCode,
        })
        .then(res => {
        // console.log(res.data);
        let accessToken = res.data.accessToken
        // let refreshToken =  // 아마도 refreshToken도 body에 담겨서 올 예정이므로 수정 필요
        setAccessToken(accessToken)
        setIsLogin(true)
        history.push('/main/home')
        })
    }
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    setCode(authorizationCode)
    console.log('인증 코드', authorizationCode);
    if (authorizationCode) {
    await getAccessToken(authorizationCode)
    }
  }, [code])

  

  // 이벤트핸들러 함수
  //* input 입력
  const loginInfoHandler = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value })
  }

  //* 로그인 핸들러
  const loginRequestHandler = () => {
    
    const { email, password } = loginInfo;

    axios.post(
      `http://ec2-3-35-205-114.ap-northeast-2.compute.amazonaws.com/signin`,
      { email, password },
      { withCredentials: true }
    )
      .then((res) => {
        console.log('refreshToken은 어디에 있나요???', res.data.data)
        const { accessToken } = res.data.data;
        setAccessToken(accessToken)
        setIsLogin(true);
        history.push('/main/home')
      })
      .catch((err)=> {
        // err의 status에 따라서 setErrMessage를 보여줘야하는 것 구현완료
        console.log(err)
        if(err.request.status === 401) {
          // 에러코드가 401로 생기면 이메일과 비밀번호 를 다시 확인하라는 메세지가 뜨고
          setErrMessage('이메일과 비밀번호를 다시 확인해주세요')

          // 3초 후에 메세지가 사리지도록 코드구현
          let timer = setTimeout(() => {
            setErrMessage('')
          }, 3000)

          // 버그 방지용 
          return () => { clearTimeout(timer)}
        }
      })
  }

  //* 카카오 로그인 핸들러
  const socialLoginRequestHandler = () => {
    
    window.location.assign( 
      `https://kauth.kakao.com/oauth/authorize?client_id=750325bb6d6f5b4a028d5064c28496c8&redirect_uri=http://localhost:3000/login&response_type=code`
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
        <div>
        {/* 401에러가 발생했을 때 유저에게 보여지는 메세지 */}
          {
            errMessage &&
            <p className='errMessage'>{errMessage}</p>
          }
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
        {/* 카카오 로그인하기 구현 중 */}
        <div className='btnSocial'>
          <img 
            className='btnSocial'
            src={kakao}
            onClick={socialLoginRequestHandler}
          />
        </div>
      </div>
    );
  }
    
export default Login ;  

// 로그인 페이지입니다.