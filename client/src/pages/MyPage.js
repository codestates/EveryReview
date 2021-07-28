import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { passwordCheck, passwordChangeCheck } from '../utils/ValidityCheck';
import { GrUserAdmin, GrUserSettings, GrUserExpert } from 'react-icons/gr'
import { HiOutlineMail } from 'react-icons/hi'
import profile from '../static/defaultProfile.jpeg'
import './MyPage.css'

function MyPage({ handleTitle, userInfo, auth, isLogin, setUserInfo, setIsLogin }) {

  let history = useHistory();
  // 상태관리
  const [newInfo, setNewInfo] = useState({
    password: '',
    newPassword: '',
    newPasswordCheck: ''
  })
  // 변경사항에 대한 결과message
  const [message, setMessage] = useState('')


  // 이벤트핸들러 함수
  useEffect(() => {
    // 헤더 타이틀 설정
    handleTitle("My Page");
    auth();
  }, []);

  //* input 입력
  const newInfoHandler = (event) => {
    setNewInfo({ ...newInfo, [event.target.name]: event.target.value })
  }

  //* 입력값 유효성 검사 메세지
  const errMessageHandler = (message) => {
    switch (message) {
      // 비밀번호
      case 'empty':
        setMessage('영문, 숫자, 기호를 포함하며 공백이 없어야 합니다');
        break;
      case 'shortPassword':
        setMessage('비밀번호는 8자 이상이어야 합니다');
        break;
      case 'invalidPassword':
        setMessage('영어, 숫자, 기호를 포함하여 8자 이상으로 설정해 주세요');
        break
      case 'validPassword':
        setMessage('');
        break;

      default:
        return '';
    }
  }

  //* 비밀번호 변경취소
  const cancelHandler = (event) => {
    event.preventDefault();
  }

  //* 비밀번호 변경완료
  const passwordChangeHandler = () => {
    const { password, newPassword, newPasswordCheck } = newInfo;

    if (newPassword !== newPasswordCheck) {

      setMessage('입력하신 새 비밀번호가 일치하지 않습니다')

    } else if (password === newPassword) {

      setMessage('기존 비밀번호와 똑같이 변경할 수 없습니다')

    } else if (passwordChangeCheck(newPassword)) {

      // 에러메세지가 없을때 비밀번호 변경 요청 실행
      axios
        .post(`${process.env.REACT_APP_END_POINT}/mypage`, {
          password,
          newPassword
        },
          { withCredentials: true }
        )
        .then((res) => {
          alert('비밀번호 변경이 완료되었습니다. 새로운 비밀번호로 다시 로그인해주세요')

          // 비밀번호가 변경되면 서버에 쿠키 삭제 요청
          axios
            .get(
              `${process.env.REACT_APP_END_POINT}/signout`,
              { withCredentials: true }
            )
            .then((res) => {
              // 요청이 완료되면 로그인페이지로 이동
              history.push("/login");
            })
        })
        .catch((err) => {
          console.log('비밀번호변경 오류가 나면 알려줘!!', err)
          setMessage('비밀번호를 다시 확인해주세요')
          let timer = setTimeout(() => {
            setMessage('')
          }, 3000)
          // 버그 방지용 
          return () => { clearTimeout(timer) }
        })
    } else {
      setMessage('새로운 비밀번호를 다시 확인해주세요')
    }
  }

  return (
    <>
      {
        isLogin 
        ? <div className='myPageContainer'>
            <div className='myPageUserInfo'>
              {
                userInfo.profile === null
                ? (
                    <img
                      className='imgUserProfile'
                      src={profile}
                      alt='user profile'
                    />
                  )
                : (
                    <img
                      className='imgUserProfile'
                      src={userInfo.profile}
                      alt='user profile'
                    />
                  )
              }
              <div className='userInfo'>
                <p id='msgHello'>반가워요, {userInfo.username}님!</p>
                <div className='infoWrap'>
                  <HiOutlineMail className='myPageIcon' />
                  <div className='infoEmail'>{userInfo.email}</div>
                </div>
              </div>
            </div>

            <form className='inputField'>
              <p className='boxText'>회원정보 변경 </p>
              <div className='inputWrap'>
                <GrUserAdmin className='memberIcon' />
                <input
                  className='inputSignin'
                  name='password'
                  type='password'
                  placeholder='기존 비밀번호 입력'
                  value={newInfo.password}
                  onChange={newInfoHandler}
                />
              </div>
              <div className='inputWrap'>
                <GrUserSettings className='memberIcon' />
                <input
                  className='inputSignin'
                  name='newPassword'
                  type='password'
                  placeholder='새로운 비밀번호 입력'
                  value={newInfo.newPassword}
                  onChange={newInfoHandler}
                  onKeyUp={() => errMessageHandler(passwordCheck(newInfo.password))}
                />
              </div>
              <div className='inputWrap'>
                <GrUserExpert className='memberIcon' />
                <input
                  className='inputSignin'
                  name='newPasswordCheck'
                  type='password'
                  placeholder='새로운 비밀번호 확인'
                  value={newInfo.newPasswordCheck}
                  onChange={newInfoHandler}
                  // enter로 정보를 submit
                  onKeyUp={(event) => (
                    event.key === 'Enter'
                      ? passwordChangeHandler(event)
                      : null
                  )}
                />
              </div>
            </form>
            {
              message &&
              <p className='errMessage'>{message}</p>
            }

            <div className='btnMypageWrap'>
              <button
                className='btnMypage'
                onClick={cancelHandler}
              >
                취소
              </button>
              <button
                className='btnMypage'
                onClick={passwordChangeHandler}
              >
                확인
              </button>
            </div>

          </div> 
          : <Redirect to="/" />
      }
    </>
  );
}

export default MyPage;

// My page 입니다