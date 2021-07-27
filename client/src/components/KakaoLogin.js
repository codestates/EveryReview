import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';


function KakaoLogin ({ setIsLogin, setAccessToken }) {

    let history = useHistory()

    // Kakao 로그인 구현
  useEffect(async () => {
    const getAccessToken = async authorizationCode => {
    let tokenData = await axios
        .post(`${process.env.REACT_APP_END_POINT}/oauth`, {
        code: authorizationCode,
        })
        .then(res => {
        // console.log('카카오에 대한 응답이 어떻게 오지?????', res);
        let accessToken = res.data.data.accessToken
        // console.log('토큰을 보여줘', accessToken)
        // localStorage.setItem('token', accessToken)
        setAccessToken(accessToken)
        setIsLogin(true)
        history.push('/main/home')
        })
        .catch((err)=> {
          console.log('카카오로그인에러가 나면 에러메세지를 보여줘!!', err)
          // history.replace('/')
        })
    }
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    // console.log('인증 코드', authorizationCode);
    if (authorizationCode) {
      await getAccessToken(authorizationCode)
    }
  },[])

  //console.log('인증 코드?????????', code);

    return (
      <div>
      </div>
    )
}

export default KakaoLogin;