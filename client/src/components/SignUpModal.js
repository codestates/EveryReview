import './SignUpModal.css';
import { Link } from "react-router-dom";

function SignUpModal() {

  // 상태관리


  // 이벤트핸들러 함수
  const signupRequestHandler = () => {

  }
  const socialSignupRequestHandler = () => {

  }


  
    return (
      <div className='signupModalContainer'>
        <div className='imgBI'>
          <img alt='EveryReview BI' />
        </div>

        <div className='inputField'>
          <input
            name='email'
            type='text'
            placeholder='이메일주소'
          />
          <input
            name='password'
            type='password'
            placeholder='비밀번호'
          />  
          <input
            name='password check'
            type='password'
            placeholder='비밀번호 확인'
          />  
          <input
            name='username'
            type='text'
            placeholder='성명'
          />
          <input
            name='nickname'
            type='text'
            placeholder='별명'
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
          이미 계정이 있으신가요? <Link>로그인</Link>
        </div>

        <div className='btnSocial'>
          <button 
            className='btnSubmit'
            onClick={socialSignupRequestHandler}
          >
            카카오 계정으로 회원가입
          </button>
        </div>
      </div>
    );
}
    
export default SignUpModal;    

// 회원가입 모달창입니다.