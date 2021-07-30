const db = require('../../db');

// 회원가입 및 아이디 생성 기능
module.exports = {
	post: (req, res) => {
		const { username, email, password } = req.body;

		// 전달받은 정보가 불충분한 경우
		if (!username || !email || !password) {
			res.status(422).json({ message: "Insufficient parameters supplied" })
		};

		// 중복 항목을 위한 유효성 검증
		db.promise().query(`SELECT * FROM users WHERE email = "${email}" OR username = "${username}"`)
			.then(([rows, fields]) => {
				let emailCheck = false;
				let usernameCheck = false;

				rows.map((el) => {
					if (el.email === email) emailCheck = true;
					if (el.username === username) usernameCheck = true;
				})

				if (emailCheck && usernameCheck) {  // 둘 다 중복인 경우
					res.status(409).send("Both already existed")
				} else if (emailCheck) {  // 이메일이 중복인 경우
					res.status(409).send("Email already existed")
				} else if (usernameCheck) {  // username 이 중복인 경우
					res.status(409).send("Username already existed")
				} else {  // 중복이 없을 경우 유저데이터 생성, 회원가입 성공
					db.promise().query(`INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, [email, password, username])
						.then(([rows, fields]) => {
							res.status(200).json({ message: "Signup success" });
						})
						.catch((err) => {
							console.log(err);
							res.status(500).json({ message: "Sorry" });
						})
				}
			})
	}
};
