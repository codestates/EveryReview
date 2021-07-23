// 로그인 여부 판단 기능
// Access token payload로 응답 제공

const db = require('../../db');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.json({ data: null, message: 'invalid access token' });
    }
    const { email, username } = accessTokenData;

    db.promise().query(`SELECT * from users WHERE email = "${email}" AND username = "${username}"`)
    .then(([ rows, fields ]) => {
      if (rows.length === 0) {
        res.status(401).json({ message: "No information!"})
      } else {
        res.status(200).json({
          data : {
            email: rows[0].email,
            username: rows[0].username,
            img: rows[0].img
          },
          message: "Userinfo found"
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Sorry, we have an issue!" });
    })

  }
}