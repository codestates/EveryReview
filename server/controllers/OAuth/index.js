// 카카오 소셜 로그인 관련

const db = require('../../db');
const axios = require('axios');
const dotenv = require('dotenv');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../tokenFunctions');
dotenv.config();

module.exports = {
  post: (req, res) => {
    // 클라이언트로부터 인가 코드 전달받기
    const kakaoAuthorizationCode = req.body.code;
    // 인가 코드를 전달받지 못했을 경우
    if (!kakaoAuthorizationCode) {
      return res.status(401).json({ message : "AuthorizationCode not provided" })
    }
    // 전달받은 인가코드로 카카오에 AccessToken 요청
    axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        "Content-type": 'application/x-www-form-urlencoded;charset=utf-8'
      },
      params: {
        grant_type: 'authorization_code',
        client_id: '750325bb6d6f5b4a028d5064c28496c8',
        redirect_uri: 'http://everyreview-team6-deploy.s3-website.ap-northeast-2.amazonaws.com//login',
        // redirect_uri: 'http://http://everyreview-team6-deploy.s3-website.ap-northeast-2.amazonaws.com//social',
        code: kakaoAuthorizationCode
      }
    })
    .then((result1) => {
      const { access_token, refresh_token } = result1.data;  // 전달받은 토큰
      axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          "Content-type": 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: 'Bearer ' + access_token
        }
      })
      .then((result2) => {
        // 카카오에서 전달받은 사용자 정보
        console.log(result2.data);
        const { nickname, profile_image } = result2.data.properties;
        const { id } = result2.data;
        const { email } = result2.data.kakao_account;
        // 기존 회원 정보와 겹치는지 검증 (이메일만 검증했기 때문에 유저네임이 겹치는 경우 파악할 수 없음)
        db.promise().query(`SELECT * FROM users WHERE email = "${email}"`)
        .then( ([ rows, fields ]) => {
          if (rows.length === 0) {
            db.promise().query(`INSERT INTO users (email, password, username, profile) VALUES (?, ?, ?, ?)`, [email, id, nickname, profile_image])
          }
        });
        // 등록된 데이터 정보를 가지고 AccessToken, RefreshToken 발급 및 전달
        db.promise().query(`SELECT * FROM users WHERE email = "${email}"`)
          .then(([ rows, fields ]) => {
            const { id, username, email, profile } = rows[0];
            const accessToken = generateAccessToken({ 
              id : id,
              username : username,
              email : email,
              profile : profile
            });
            // RefreshToken 발급
            const refreshToken = generateRefreshToken({ 
              id : id,
              username : username,
              email : email,
              profile : profile
            });
            // 토큰 전달
            sendRefreshToken(res, refreshToken);
            sendAccessToken(res, accessToken);
          })
      })				
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ message: "Sorry" });
      })
    })
  }
};