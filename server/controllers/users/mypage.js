// mypage 수정 관련 기능 구현
const db = require('../../db');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    // accessToken 검증
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {  // accessToken 이 없는 경우 
      return res.status(401).json({ message: 'invalid access token' });
    }
    // accessToken 이 유효한 경우
    const { id } = accessTokenData;
    const { password } = req.body;
    db.promise().query(`SELECT * from users WHERE id = "${id}" AND password = "${password}"`)
      .then(([rows, fields]) => {
        if (rows.length === 0) {  // 일치하는 유저 정보가 없는 경우
          res.status(404).json({ message: "Userinfo not found" })
        } else {  // 유저 정보가 있는 경우
          const { newPassword, newProfile } = req.body;
          if (newPassword) {  // 비밀번호를 수정하는 경우
            db.promise().query(`UPDATE users SET password = "${newPassword}" WHERE users.id = "${id}"`)
          }
          if (newProfile) {  // 프로필 이미지를 수정하는 경우
            db.promise().query(`UPDATE users SET profile = "${newProfile}" WHERE users.id = "${id}"`)
          }
          // 유저 정보가 잘 수정되었을 경우
          res.status(200).json({ message: "Userinfo successfully changed" })
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Sorry" });
      })
  }
};