const db = require('../../db');

const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
  isAuthorized
} = require('../tokenFunctions');

// 로그인 정보로 사용자 인증
// 토큰 생성 후 전달

module.exports = {
  post: (req, res) => {  // 토큰 발급 과정
    const { email, password } = req.body;
    // 이메일, 패스워드 검증
    db.promise().query(`SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`)
      .then(([rows, fields]) => {
        if (rows.length === 0) {  // 일치하는 유저정보가 없는 경우
          res.status(401).json({ message: "Userinfo not found" })
        } else {  // 유저인 경우
          // AccessToken 발급
          const { id, username, email, profile } = rows[0];
          const accessToken = generateAccessToken({
            id: id,
            username: username,
            email: email,
            profile: profile
          });
          // RefreshToken 발급
          const refreshToken = generateRefreshToken({
            id: id,
            username: username,
            email: email,
            profile: profile
          });
          // 토큰 전달
          sendRefreshToken(res, refreshToken);
          sendAccessToken(res, accessToken);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Sorry" })
      })
  },
  get: (req, res) => {  // 발급받은 토큰으로 정보 요청
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {  // accessToken 이 없는 경우
      return res.status(404).json({ message: 'invalid access token' });
    }
    const { id } = accessTokenData;
    db.promise().query(`SELECT * from users WHERE id = "${id}"`)
      .then(([rows, fields]) => {
        if (rows.length === 0) {  // 유저 정보가 없는 경우
          res.status(401).json({ message: "Userinfo not found" });
        }
        const { username, email, profile } = rows[0];
        res.status(200).json({  // 유저 정보 전달
          data: {
            email: email,
            username: username,
            profile: profile
          },
          message: "Userinfo found"
        })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Sorry" });
      })
  }
};
