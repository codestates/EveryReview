import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { emailCheck, passwordCheck, usernameCheck, checkAll } from '../utils/ValidityCheck'
import './SignUp.css';
import Logo from '../components/Logo';
import KakaoLogin from '../components/KakaoLogin';
import kakao from '../static/kakao_signup.png'
// React icon 사용
import { RiLockPasswordLine, RiLockPasswordFill, RiUserSmileLine } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'


function SignUp({ setIsLogin }) {

  const history = useHistory();

  // 상태관리
  //* 회원가입 시 입력되는 사용자 정보 
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    username: '',
  })
  //* 유효하지 않은 입력값에 대한 메세지
  const [errMessage, setErrMessage] = useState({
    emailErr: '',
    passwordErr: '',
    passwordCheckErr: '',
    usernameErr: '',
    otherErr: ''
  })

  // 이벤트핸들러 함수
  //* input 박스 변경 함수
  const inputHandler = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });

    // let timer = setTimeout(() => {
    //   setErrMessage('')
    // }, 3000)
    // // 버그 방지용 
    // return () => { clearTimeout(timer)}
  }
  //* 입력값 유효성 검사 메세지
  const errMessageHandler = (message) => {
    switch (message) {
      // 이메일
      case 'invalidEmail':
        setErrMessage({
          ...errMessage,
          emailErr: '유효한 이메일을 입력해주세요',
        });
        break;
      case 'validEmail':
        setErrMessage({
          ...errMessage,
          emailErr: '',
        });
        break;

      // 비밀번호
      case 'empty':
        setErrMessage({
          ...errMessage,
          passwordErr: '영문, 숫자, 기호를 포함하며 공백이 없어야 합니다',
        });
        break;
      case 'shortPassword':
        setErrMessage({
          ...errMessage,
          passwordErr: '비밀번호는 8자 이상이어야 합니다',
        });
        break;
      case 'invalidPassword':
        setErrMessage({
          ...errMessage,
          passwordErr: '영어, 숫자, 기호를 포함하여 8자 이상으로 설정해 주세요',
        });
        break
      case 'validPassword':
        setErrMessage({
          ...errMessage,
          passwordErr: "",
        });
        break;

      // 사용자이름
      case 'shortUsername':
        setErrMessage({
          ...errMessage,
          usernameErr: '사용자 이름은 2글자 이상이어야 합니다',
        });
        break;
      case 'invalidUsername':
        setErrMessage({
          ...errMessage,
          usernameErr: '사용자 이름은 한글, 영어, 숫자로 구성되며 공백이 없어야 합니다',
        });
        break;
      case 'validUsername':
        setErrMessage({
          ...errMessage,
          usernameErr: "",
        });
        break;

      default:
        return '';
    }

  }

  // 회원가입 요청
  const signupRequestHandler = (event) => {
    // 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다.
    event.preventDefault();

    const { email, password, passwordCheck, username } = userInput;
    if (!checkAll(email, password, username) && !passwordCheck) {
      setErrMessage({
        ...errMessage,
        otherErr: '모든 항목을 올바르게 작성해주세요'
      })
      // 2초 후에 메세지가 사리지도록 코드구현
      let timer = setTimeout(() => {
        setErrMessage('')
      }, 2000)
    } else if(checkAll(email, password, username)) {
      // 입력값이 모두 올바로 들어가야 서버에 가입요청 시작
      axios.post(
        `${process.env.REACT_APP_END_POINT}/signup`,
        {
          email: email,
          password: password,
          username: username
        },
        { withCredentials: true }
      )
        .then(() => {
          axios.post(
            `${process.env.REACT_APP_END_POINT}/signin`,
            {
              email: email,
              password: password
            },
            { withCredentials: true }
          )
            .then((res) => {
              alert(`반갑습니다`)
              setIsLogin(true);
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => {
          console.log(err.response)
          console.log(err.response.data)
          if (err.response.data === 'Email already existed') {
            setErrMessage({
              ...errMessage,
              otherErr: '이미 존재하는 이메일입니다'
            })
          }
          if (err.response.data === 'Username already existed') {
            setErrMessage({
              ...errMessage,
              otherErr: '이미 존재하는 사용자이름 입니다'
            })
          }
          if (err.response.data === 'Both already existed') {
            setErrMessage({
              ...errMessage,
              otherErr: '이미 존재하는 이메일과 사용자이름 입니다'
            })
          }
        })
    }

  }
  // 소셜 회원가입 요청
  const socialSignupRequestHandler = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=http://localhost:3000/login&response_type=code`
    )
  }


  return (
    <div className='signupContainer'>
      <Logo />
      <form className='inputField'>
        <div className='inputWrap'>
          <HiOutlineMail className='memberIcon' />
          <input
            className='inputSignup'
            name='email'
            type='email'
            placeholder='이메일주소'
            required
            onChange={inputHandler}
            onKeyUp={() => errMessageHandler(emailCheck(userInput.email))}
          />
        </div>
        {
          errMessage.emailErr &&
          <p className='errMessage'>{errMessage.emailErr}</p>
        }
        <div className='inputWrap'>
          <RiLockPasswordLine className='memberIcon' />
          <input
            className='inputSignup'
            name='password'
            type='password'
            placeholder='비밀번호'
            required
            onChange={inputHandler}
            onKeyUp={() => errMessageHandler(passwordCheck(userInput.password))}
          />
        </div>
        {
          errMessage.passwordErr &&
          <p className='errMessage'>{errMessage.passwordErr}</p>
        }
        <div className='inputWrap'>
          <RiLockPasswordFill className='memberIcon' />
          <input
            className='inputSignup'
            name='passwordCheck'
            type='password'
            placeholder='비밀번호 확인'
            required
            onChange={inputHandler}
          />
        </div>
        {
          userInput.password &&
          userInput.passwordCheck &&
          userInput.password !== userInput.passwordCheck &&
          (<p className='errMessage'>비밀번호가 일치하지 않습니다</p>)
        }
        <div className='inputWrap'>
          <RiUserSmileLine className='memberIcon' />
          <input
            className='inputSignup'
            name='username'
            type='text'
            placeholder='사용자이름'
            required
            maxLength='10'
            onChange={inputHandler}
            onKeyUp={() => errMessageHandler(usernameCheck(userInput.username))}
            // enter로 정보를 submit
            onKeyUp={(event) => (
              event.key === 'Enter'
                ? signupRequestHandler(event)
                : null
            )}
          />
        </div>
        {
          errMessage.usernameErr &&
          <p className='errMessage'>{errMessage.usernameErr}</p>
        }
        {
          errMessage.otherErr &&
          <p className='errMessage'>{errMessage.otherErr}</p>
        }
      </form>

      <div>
        <button
          className='btnSubmit'
          onClick={signupRequestHandler}
        >
          가입하기
        </button>
      </div>

      <div className='btnSocial'>
        <img
          src={kakao}
          onClick={socialSignupRequestHandler}
        />
        <KakaoLogin />
      </div>

      <div className='loginMove'>
        이미 계정이 있으신가요? &nbsp;&nbsp;
        <span
          className='btnPageChange'
          onClick={() => history.push('/login')}
        >로그인</span>
      </div>
    </div>
  );
}

export default SignUp;

// 회원가입 페이지입니다.