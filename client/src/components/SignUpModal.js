import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './SignUpModal.css';
import { emailCheck, passwordCheck, usernameCheck, checkAll } from '../utils/ValidityCheck'


function SignUpModal({ loginBtnHandler, signupBtnHandler }) {

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
            passwordErr: '영어 대소문자, 숫자, 기호를 포함하며 공백이 없어야 합니다',
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

      const endpoint = '';

      axios.post(
        `${endpoint}/signup`, 
        {
          email: email,
          password: password,
          username: username
        },
        { withCredentials: true }
      )
        .then(() => {
          axios.post(
            '', 
            {
              email: email,
              password: password
            },
            { withCredentials: true }
          )
            .then((res) => {
              const { email, username, accessToken, img } = res.data;
              // 데이터를 전달해야 하는데 어떻게 전달할지?

              // 회원가입 완료되면 메인페이지로 이동
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
      <div className='signupModalContainer'>
        {/* 회원가입 모달창 close btn */}
        <div className=''>
          <button 
            className='btnClose'
            onClick={signupBtnHandler}
          >
            &times;
          </button>
        </div>

        <div className='imgBI'>
          <img alt='EveryReview BI' />
        </div>

        <div className='inputField'>
          <div>
            <input
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
            className='btnModalChange'
            onClick={loginBtnHandler}
          >로그인</span>
        </div>

        <div className='btnSocial'>
          {/* <button 
            className='btnSubmit'
            onClick={socialSignupRequestHandler}
          >
          </button> */}
          {/* 
            이미지 소스 처리방법 고민 필요
            카카오싱크(간편회원가압)은 실명을 제공하지 않음. 확인 필요
          */}
          <img src='https://developers.kakao.com/tool/resource/static/img/button/kakaosync/complete/ko/kakao_login_medium_wide.png'/>
        </div>
      </div>
    );
}
    
export default SignUpModal;    

// 회원가입 모달창입니다.