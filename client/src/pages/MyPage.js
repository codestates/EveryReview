import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { passwordCheck } from '../utils/ValidityCheck';
import './MyPage.css'

function MyPage({ handleTitle, userInfo, auth, isLogin }) {

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

    let timer = setTimeout(() => {
      setMessage('')
    }, 3000)
    // 버그 방지용 
    return () => { clearTimeout(timer) }
  }

  //* 비밀번호 변경취소
  const cancelHandler = (event) => {
    event.target.value = '';
  }

  //* 비밀번호 변경완료
  const passwordChangeHandler = () => {
    const { password, newPassword, newPasswordCheck } = newInfo;

    if (newPassword !== newPasswordCheck) {
      setMessage('입력하신 새 비밀번호가 일치하지 않습니다')
      let timer = setTimeout(() => {
        setMessage('')
      }, 3000)
      // 버그 방지용 
      return () => { clearTimeout(timer) }
    } else if (password === newPassword) {
      setMessage('기존 비밀번호와 똑같이 변경할 수 없습니다')
      let timer = setTimeout(() => {
        setMessage('')
      }, 3000)
      // 버그 방지용
      return () => { clearTimeout(timer) }
    } else {
      axios
        .post(`${process.env.REACT_APP_END_POINT}/mypage`, {
          password,
          newPassword
        },
          { withCredentials: true }
        )
        .then((res) => {
          alert('비밀번호 변경이 완료되었습니다')
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
    }
  }


  return (
    <>
      {
        isLogin ?
          <div className='myPageContainer'>
            <div>
              <img
                className='imgUserProfile'
                src={userInfo.profile}
                alt='user profile'
              />
            </div>
            <div>
              <p>반가워요, {userInfo.username}님!</p>
              <div>이메일: {userInfo.email}</div>
            </div>

            <div className='inputField'>
              <input
                name='password'
                type='password'
                placeholder='기존 비밀번호 입력'
                value={newInfo.password}
                onChange={newInfoHandler}
              />
              <input
                name='newPassword'
                type='password'
                placeholder='새로운 비밀번호 입력'
                value={newInfo.newPassword}
                onChange={newInfoHandler}
                onKeyUp={() => errMessageHandler(passwordCheck(newInfo.password))}
              />
              <input
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
              {
                newInfo.newPassword &&
                newInfo.newPasswordCheck &&
                newInfo.newPassword !== newInfo.newPasswordCheck &&
                (<p className='errMessage'>비밀번호가 일치하지 않습니다</p>)
              }
            </div>
            {
              message &&
              <p>{message}</p>
            }

            <div className=''>
              <button
                className=''
                onClick={cancelHandler}
              >
                취소
              </button>
              <button
                className=''
                onClick={passwordChangeHandler}
              >
                확인
              </button>
            </div>

          </div> :
          <Redirect to="/" />

      }
    </>
  );
}

export default MyPage;

// My page 입니다