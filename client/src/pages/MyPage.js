<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD


<<<<<<< HEAD
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { passwordCheck } from '../utils/ValidityCheck';
import './MyPage.css'

function MyPage({ handleTitle, userInfo, auth, isLogin }) {

  let history = useHistory();
  // 상태관리
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
  const [ newInfo, setNewInfo ] = useState({
=======
  const [newInfo, setNewInfo] = useState({
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
  const [newInfo, setNewInfo] = useState({
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
  const [ newInfo, setNewInfo ] = useState({
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
  const [newInfo, setNewInfo] = useState({
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
    password: '',
    newPassword: '',
    newPasswordCheck: ''
  })
  // 변경사항에 대한 결과message
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
  const [ message, setMessage ] = useState('')
=======
  const [message, setMessage] = useState('')
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
  const [message, setMessage] = useState('')
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
  const [ message, setMessage ] = useState('')
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
  const [message, setMessage] = useState('')
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8


  // 이벤트핸들러 함수
  useEffect(() => {
    // 헤더 타이틀 설정
    handleTitle("My Page");
    auth();
  }, []);

  //* input 입력
  const newInfoHandler = (event) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
    setNewInfo({...newInfo, [event.target.name]: event.target.value })
=======
    setNewInfo({ ...newInfo, [event.target.name]: event.target.value })
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
    setNewInfo({ ...newInfo, [event.target.name]: event.target.value })
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
    setNewInfo({...newInfo, [event.target.name]: event.target.value })
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
    setNewInfo({ ...newInfo, [event.target.name]: event.target.value })
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
  }

  //* 입력값 유효성 검사 메세지
  const errMessageHandler = (message) => {
    switch (message) {
      // 비밀번호
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
=======
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
      case 'empty' :
        setMessage('영문, 숫자, 기호를 포함하며 공백이 없어야 합니다');
        break;
      case 'shortPassword' :
        setMessage('비밀번호는 8자 이상이어야 합니다');
        break;
      case 'invalidPassword' :
<<<<<<< HEAD
=======
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
      case 'empty':
        setMessage('영문, 숫자, 기호를 포함하며 공백이 없어야 합니다');
        break;
      case 'shortPassword':
        setMessage('비밀번호는 8자 이상이어야 합니다');
        break;
      case 'invalidPassword':
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
        setMessage('영어, 숫자, 기호를 포함하여 8자 이상으로 설정해 주세요');
        break
      case 'validPassword':
        setMessage('');
        break;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
      
=======

>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======

>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
      
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======

>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
      default:
        return '';
    }

    let timer = setTimeout(() => {
      setMessage('')
    }, 3000)
    // 버그 방지용 
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
    return () => { clearTimeout(timer)}
=======
    return () => { clearTimeout(timer) }
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
    return () => { clearTimeout(timer) }
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
    return () => { clearTimeout(timer)}
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
    return () => { clearTimeout(timer) }
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
  }

  //* 비밀번호 변경취소
  const cancelHandler = (event) => {
    event.target.value = '';
  }

  //* 비밀번호 변경완료
  const passwordChangeHandler = () => {
    const { password, newPassword, newPasswordCheck } = newInfo;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
    if(newPassword !== newPasswordCheck) {
=======
    if (newPassword !== newPasswordCheck) {
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
    if (newPassword !== newPasswordCheck) {
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
    if(newPassword !== newPasswordCheck) {
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
    if (newPassword !== newPasswordCheck) {
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
      setMessage('입력하신 새 비밀번호가 일치하지 않습니다')
      let timer = setTimeout(() => {
        setMessage('')
      }, 3000)
      // 버그 방지용 
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
      return () => { clearTimeout(timer)}
    } else if(password === newPassword) {
=======
      return () => { clearTimeout(timer) }
    } else if (password === newPassword) {
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
      return () => { clearTimeout(timer) }
    } else if (password === newPassword) {
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
      return () => { clearTimeout(timer)}
    } else if(password === newPassword) {
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
      return () => { clearTimeout(timer) }
    } else if (password === newPassword) {
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
      setMessage('기존 비밀번호와 똑같이 변경할 수 없습니다')
      let timer = setTimeout(() => {
        setMessage('')
      }, 3000)
      // 버그 방지용
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
      return () => { clearTimeout(timer)}
=======
      return () => { clearTimeout(timer) }
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
      return () => { clearTimeout(timer) }
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
      return () => { clearTimeout(timer)}
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
      return () => { clearTimeout(timer) }
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
    } else {
      axios
        .post(`${process.env.REACT_APP_END_POINT}/mypage`, {
          password,
          newPassword
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
=======
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
        }, 
        {withCredentials: true }
      )
        .then((res) => {
            alert('비밀번호 변경이 완료되었습니다')
<<<<<<< HEAD
=======
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
        },
          { withCredentials: true }
        )
        .then((res) => {
          alert('비밀번호 변경이 완료되었습니다')
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
        })
        .catch((err) => {
          console.log('비밀번호변경 오류가 나면 알려줘!!', err)
          setMessage('비밀번호를 다시 확인해주세요')
          let timer = setTimeout(() => {
            setMessage('')
          }, 3000)
          // 버그 방지용 
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
=======
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
          return () => { clearTimeout(timer)}
        })
      }
    }

  
=======
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
          return () => { clearTimeout(timer) }
        })
    }
  }


<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
  return (
    <>
      {
        isLogin ?
          <div className='myPageContainer'>
            <div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
              <img 
=======
              <img
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
              <img
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
              <img 
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
              <img
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
                    :null
                  )}
                />  
                {
                  newInfo.newPassword &&
                  newInfo.newPasswordCheck &&
                  newInfo.newPassword !== newInfo.newPasswordCheck &&
                  (<p className='errMessage'>비밀번호가 일치하지 않습니다</p>)
                }
<<<<<<< HEAD
=======
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4f00ff593ab0e507de45edadd8a58ced9ab55ec0
<<<<<<< HEAD
=======
>>>>>>> 13b79751d3d51c80c9b1156b7a8e68ff806039b3
=======
>>>>>>> 4df144dde18d1deab661ff44c580477f0ad450e8
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