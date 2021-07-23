const db = require('../../db');

// 회원가입 및 아이디 생성 기능
module.exports = {
	post: (req, res) => {
		const { username, nickname, email, password } = req.body;

		if (!username || !nickname || !email || !password) {
			res.status(422).json({ message: "insufficient parameters supplied"})
		};

		// 기능 구현에는 성공했습니다만, 이렇게 해서는 콜백 헬이 되어버리는 것 같습니다.
		// 이를 해결하려면 가급적 클라이언트에서 두 번으로 나누어 요청하도록 구현해야 할 듯 싶습니다.
		db.query(`SELECT * FROM users WHERE email = "${email}" AND nickname = "${nickname}"`, function (error, results, fields) {
			if (results.length === 0) {
				db.query(`SELECT * FROM users WHERE nickname = "${nickname}"`, (error, results, fields) => {
					if (results.length === 0) {
						db.query(`SELECT * FROM users WHERE email = "${email}"`, (error, results, fields) => {
							if (results.length === 0) {
								db.query(`INSERT INTO users (email, password, nickname, username) VALUES (?, ?, ?, ?)`, [email, password, nickname, username], (error, result) => {
									if (error) {
										res.status(500).json({ message: "sorry"})
									} else {
										res.status(200).json({ message: "Signup success!"})
									}
								})
							} else {
								res.status(409).json({
									data: {
										email: true,
										nickname: false
									},
									message: "email already existed!"
								})
							}
						});
					} else {
						res.status(409).json({
							data: {
								email: false,
								nickname: true
							},
							message: "nickname already existed!"
						});
					}
				});
			} else {
				console.log(results)
				res.status(409).json({
					data: {
						email: true,
						nickname: true
					},
					message: "Both already existed!"
				})
			}
		});
	}
};
