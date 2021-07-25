import './MyPage.css'

function MyPage() {
  // 상태관리


  // 이벤트핸들러 함수


  return (
    <div className='myPageContainer'>
      <div className='imgUserProfile'>
        <img alt='user profile' />
      </div>
      <div>
        <p>반가워요, username님!</p>
        <div>이메일: email</div>
      </div>

      <div className='inputField'>
          <input
            name='password'
            type='password'
            placeholder='비밀번호 입력'
          />
          <input
            name='password'
            type='password'
            placeholder='새로운 비밀번호 입력'
          />  
          <input
            name='password check'
            type='password'
            placeholder='새로운 비밀번호 확인'
          />  
      </div>

      <div className=''>
        <button 
          className=''
        >
          취소
        </button>
        <button 
          className=''
        >
          확인
        </button>
      </div>

    </div>
  );
}

export default MyPage;

// My page 입니다
