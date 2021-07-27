// 카카오 소셜 로그인 관련

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  post: (req, res) => {
    // 토큰 받아 카카오에 정보 요청
    const kakaoAuthorizationCode = req.body.code;
  
    if (!authorization) {
      return res.status(401).json({ message : "AuthorizationCode not provided" })
    }
  
    axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        "Content-type": 'application/x-www-form-urlencoded;charset=utf-8'
      },
      params: {
        grant_type: 'authorization_code',
        client_id: '750325bb6d6f5b4a028d5064c28496c8',
        redirect_uri: 'http://http://everyreview-team6-deploy.s3-website.ap-northeast-2.amazonaws.com//social',
        code: kakaoAuthorizationCode
      }
    })
    .then((res) => {
      console.log(res);
    })

  }
};