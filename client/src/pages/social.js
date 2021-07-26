/*eslint-disable*/

import axios from "axios"
import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"

function Social ({ setIsLogin, setAccessToken }) {

    const [ isAuthrize, setIsAuthrize ] = useState(false)

    const kakaoSocialLogin = () => {
        const url = new URL(window.location.href)
        const authorizationCode = url.searchParams.get('code')
        console.log(authorizationCode)
        axios.post(
            `http://ec2-3-35-205-114.ap-northeast-2.compute.amazonaws.com/oauth`,
            {
                code: authorizationCode
            }
        )
        .then((res)=> {
            const { accessToken } = res.data.data
            setAccessToken(accessToken)
            setIsLogin(true);
            setIsAuthrize(true)
        })
    }

    useEffect(()=> {
        kakaoSocialLogin()
    }, [])


    return (
        <div>
            {
                isAuthrize
                ? <Redirect to= '/main/home' />
                : <p>메인페이지로 이동 중입니다. 잠시만 기다려주세요.</p>
            }
        </div>
    )
}

export default Social