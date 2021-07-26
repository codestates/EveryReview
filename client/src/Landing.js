import { useHistory } from 'react-router-dom';

import './Landing.css';
import Logo from './components/Logo'


function Landing ({ setIsLogin, setAccessToken }) {

  const history = useHistory();

  return (
    <div className='landingContainer'>
      <Logo />
      <div className=''>
        <button 
          className=''
          onClick={()=> history.push('/login')}
        >
          로그인
        </button>
      </div>
      <div className=''>
        <button 
          className=''
          onClick={()=> history.push('/signup')}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Landing;

// 랜딩 페이지 입니다