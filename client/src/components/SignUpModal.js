import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './SignUpModal.css';



function SignUpModal() {

  const history = useHistory();

  //! 상태관리
    // 사용자 정보 
    const [ userInfo, setUserInfo ] = useState({
      email: '',
      password: '',
      passwordCheck: '',
      username: '',
      nickname: ''
    })
    // 유효하지 않은 입력값에 대한 메세지
    const [ message, setMessage ] = useState('')

  // 이벤트핸들러 함수
    // input 박스 변경 함수
    const inputHandler = (event) => {
      setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }
    // 회원가입 요청
    const signupRequestHandler = async (event) => {
      if(
        !userInfo.email ||
        !userInfo.password ||
        !userInfo.passwordCheck ||  
        !userInfo.nickname
      ) {
        if(!userInfo.email) {
          setMessage('이메일을 입력해주세요')
        }
        if(!userInfo.password) {
          setMessage('비밀번호를 입력해주세요')
        }
        if(!userInfo.passwordCheck) {
          setMessage('비밀번호를 다시 입력해주세요')
        }
        if(!userInfo.nickname) {
          setMessage('사용자이름을 입력해주세요')
        }
        return
      } else if (userInfo.password !== userInfo.passwordCheck) {
        setMessage('비밀번호가 다릅니다. 비밀번호를 다시 확인해주세요')
        return
      }

      // 회원가입이 완료되면 메이페이지로 이동
      // history.push('/main/home')

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
          >
            &times;
          </button>
        </div>

        <div className='imgBI'>
          <img alt='EveryReview BI' />
        </div>

        <div className='inputField'>
          <input
            name='email'
            type='email'
            placeholder='이메일주소'
            required
            onChange={inputHandler}
          />
          <input
            name='password'
            type='password'
            placeholder='비밀번호'
            required
            onChange={inputHandler}
          />  
          <input
            name='passwordCheck'
            type='password'
            placeholder='비밀번호 확인'
            required
            onChange={inputHandler}
          />
          {/* 비밀번호 유효성 확인 구현 중
            {
              userInfo.password !== userInfo.passwordCheck
              ? <p>입력한 비밀번호와 다릅니다</p>
              : null
            }
           */}
          <input
            name='username'
            type='text'
            placeholder='성명'
            required
            onChange={inputHandler}
          />
          <input
            name='nickname'
            type='text'
            placeholder='사용자 이름'
            required
            onChange={inputHandler}
          />  
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
          이미 계정이 있으신가요? <button>로그인</button>
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