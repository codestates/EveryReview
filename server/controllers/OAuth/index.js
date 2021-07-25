// 카카오 소셜 로그인 관련

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  get: (req, res) => {
    // 카카오 인증으로 리다이렉트
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/home&response_type=code`;
    res.redirect(kakaoAuthURL);
  },
  post: (req, res) => {
    // 토큰 받아 카카오에 정보 요청
    const kakaoAccessToken = req.body.kakaoAccessToken;
  
    if (!authorization) {
      return res.status(401).json({ message : "AccessToken not provided" })
    }
  
    const kakaoAccessTokenData = authorization.split(" ")[1];
    axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${kakaoAccessTokenData}`
      }
    })

  }
};