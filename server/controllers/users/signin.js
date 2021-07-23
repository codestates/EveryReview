const db = require('../../db');

const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../tokenFunctions');

// 로그인 정보로 사용자 인증
// 토큰 생성 후 전달

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
  
    db.promise().query(`SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`)
    .then( ([ rows, fields ]) => {
      if (rows.length === 0) {
        res.status(401).json({ message: "Userinfo not found!" })
      } else {
        const accessToken = generateAccessToken({ email : rows[0].email });
        const refreshToken = generateRefreshToken({ email : rows[0].email });
  
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, accessToken);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Sorry, we have an issue!" })
    })
  }
};
