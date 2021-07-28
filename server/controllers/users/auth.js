// 로그인 여부 판단 기능
// Access token payload로 응답 제공

const db = require('../../db');
const { isAuthorized, generateAccessToken, resendAccessToken, checkRefeshToken } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(404).json({ message: 'invalid refresh token, please sign in again' });
    }
    // refreshToken 검증
    const refreshTokenData = checkRefeshToken(refreshToken);
    if (!refreshTokenData) {  // refreshToken 이 만료된 경우
      return res.status(404).json({ message: 'invalid refresh token, please sign in again' });
    }
    const { id } = refreshTokenData;
    db.promise().query(`SELECT * from users WHERE id = "${id}"`)
      .then(([rows, fields]) => {
        if (rows.length === 0) {
          res.status(401).json({ message: "Userinfo not found" })
        } else {
          const { username, email, profile } = rows[0];
          const data = {
            username: username,
            email: email,
            profile: profile
          }
          const newAccessToken = generateAccessToken(data);
          resendAccessToken(res, newAccessToken, data);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Sorry" });
      })
  }
}