/*eslint-disable*/

import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { emailCheck, passwordCheck, usernameCheck, checkAll } from '../utils/ValidityCheck'
import './SignUp.css';
import Logo from '../components/Logo';
import kakao from '../static/kakao_signup.png'


function SignUp({ setIsLogin, setAccessToken }) {

  const history = useHistory();

  // 상태관리
    //* 회원가입 시 입력되는 사용자 정보 
    const [ userInput, setUserInput ] = useState({
      email: '',
      password: '',
      passwordCheck: '',   
      username: '',
    })
    //* 유효하지 않은 입력값에 대한 메세지
    const [ errMessage, setErrMessage ] = useState({
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

      let timer = setTimeout(() => {
        setErrMessage('')
      }, 3000)
      // 버그 방지용 
      return () => { clearTimeout(timer)}
    }
    //* 입력값 유효성 검사 메세지
    const errMessageHandler = (message) => {
      switch (message) {
        // 이메일
        case 'invalidEmail' :
          setErrMessage({
            ...errMessage,
            emailErr: '유효한 이메일을 입력해주세요',
          });
          break;
        case 'validEmail' :
          setErrMessage({
            ...errMessage,
            emailErr: '',
          });
          break;

        // 비밀번호
        case 'empty' :
          setErrMessage({
            ...errMessage,
            passwordErr: '영문, 숫자, 기호를 포함하며 공백이 없어야 합니다',
          });
          break;
        case 'shortPassword' :
          setErrMessage({
            ...errMessage,
            passwordErr: '비밀번호는 8자 이상이어야 합니다',
          });
          break;
        case 'invalidPassword' :
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
        case 'shortUsername' :
          setErrMessage({
            ...errMessage,
            usernameErr: '사용자 이름은 2글자 이상이어야 합니다',
          });
          break;
        case 'invalidUsername' :
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

      if(!email || !password || !passwordCheck || !username) {
        setErrMessage({
          ...errMessage,
          otherErr: '모든 항목을 올바르게 작성해주세요'
        })
        return
      }

      axios.post(
        `$${process.env.REACT_APP_END_POINT}/signup`, 
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
              const { accessToken } = res.data.data;
              setIsLogin(true);
              history.push('/main/home')
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => {
          console.log(err)
          // 상태코드에 따라 setErrMessage 구현해야함
        })
    }
    // 소셜 회원가입 요청
    const socialSignupRequestHandler = () => {

    }


  
    return (
      <div className='signupContainer'>
        <Logo />
        <div className='inputField'>
          <div>
            <input
              className='inputSignup'
              name='email'
              type='email'
              placeholder='이메일주소'
              required
              onChange={inputHandler}
              onKeyUp={() => errMessageHandler(emailCheck(userInput.email))}
            />
            { 
              errMessage.emailErr && 
              <p className='errMessage'>{errMessage.emailErr}</p> 
            }
          </div>
          <div>
            <input
              className='inputSignup'
              name='password'
              type='password'
              placeholder='비밀번호'
              required
              onChange={inputHandler}
              onKeyUp={() => errMessageHandler(passwordCheck(userInput.password))}
            /> 
            {
              errMessage.passwordErr && 
              <p className='errMessage'>{errMessage.passwordErr}</p>
            }
          </div>
          <div>
            <input
              className='inputSignup'
              name='passwordCheck'
              type='password'
              placeholder='비밀번호 확인'
              required
              onChange={inputHandler}
            />
            {
              userInput.password &&
              userInput.passwordCheck &&
              userInput.password !== userInput.passwordCheck &&
              (<p className='errMessage'>비밀번호가 일치하지 않습니다</p>)
            }
          </div>
          <div>
            <input
              className='inputSignup'
              name='username'
              type='text'
              placeholder='사용자이름'
              required
              onChange={inputHandler}
              onKeyUp={() => errMessageHandler(usernameCheck(userInput.username))}
            />
            {
              errMessage.usernameErr && 
              <p className='errMessage'>{errMessage.usernameErr}</p>
            }
          </div>
          {
            errMessage.otherErr && 
            <p className='errMessage'>{errMessage.otherErr}</p>
          }
        </div>

        <div className='btnSubmit'>
          <button 
            className='btnSubmit'
            onClick={signupRequestHandler}
          >
            가입하기
          </button>
        </div>

        <div className='loginMove'>
          이미 계정이 있으신가요? 
          <span
            className='btnPageChange'
            onClick={() => history.push('/login')}
          >로그인</span>
        </div>

        <div className='btnSocial'>
          <img src={kakao}/>
        </div>
      </div>
    );
}
    
export default SignUp;    

// 회원가입 페이지입니다.