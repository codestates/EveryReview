const db = require('../../db');

// 회원가입 및 아이디 생성 기능
module.exports = {
	post: (req, res) => {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			res.status(422).json({ message: "insufficient parameters supplied"})
		};

		db.promise().query(`SELECT * FROM users WHERE email = "${email}" OR username = "${username}"`)
		.then( ([ rows, fields ]) => {
			let emailCheck = false;
			let usernameCheck = false;

			rows.map((el) => {
				if (el.email === email) emailCheck = true;
				if (el.username) usernameCheck = true;
			})

			if (emailCheck && usernameCheck) {
				res.status(409).json({
					data: {
						email: true,
						username: true
					},
					message: "Both already existed!"
				})
			} else if (emailCheck) {
				res.status(409).json({
					data: {
						email: true,
						username: false
					},
					message: "Email already existed!"
				})
			} else if (usernameCheck) {
				res.status(409).json({
					data: {
						email: false,
						username: true
					},
					message: "Username already existed!"
				})
			} else {
				db.query(`INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, [email, password, username], (error, result) => {
					if (error) {
						res.status(500).json({ message: "sorry"})
					} else {
						res.status(200).json({ message: "Signup success!"})
					}
				})
			}
		})
	}
};
