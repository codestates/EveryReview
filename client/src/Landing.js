import { useHistory } from 'react-router-dom';
import mainImg from './static/readingPeople.png'
import './Landing.css';
import Logo from './components/Logo'
import { useEffect } from 'react';




function Landing ({ auth }) {
  const history = useHistory();
  useEffect(()=>{
    auth();
  },[])

  return (
    <div id='landingContainerWrap'>
      {/* <div id='upperImg'>
        <p id='mainBI'>
          에브리뷰
        </p>
        <p className='mainCopy'>
          인생책을&nbsp; 찾는&nbsp; 가장&nbsp; 빠른&nbsp; 방법
        </p>
      </div> */}
      <div className='landingContainer'>
        <Logo />
        <div className='btnMainWrap'>
          <button 
            className='btnMain'
            onClick={()=> history.push('/login')}
          >
            로그인
          </button>
          <button 
            className='btnMain'
            onClick={()=> history.push('/signup')}
          >
            회원가입
          </button>
        </div>
      </div>
      <img 
        className='mainBottomImg'
        src={mainImg} 
        />
    </div>
  );
}

export default Landing;

// 랜딩 페이지 입니다