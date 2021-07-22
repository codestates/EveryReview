const db = require('../../db');

// 회원가입 및 아이디 생성 기능
module.exports = {
	post: (req, res) => {
		const { username, nickname, email, password } = req.body;

		if (!username || !nickname || !email || !password) {
			res.status(422).json({ message: "insufficient parameters supplied"})
		};

		// email, nickname 유효성 검사 (중복여부 확인)
		const emailCheck = false;
		const nicknameCheck = false;

		db.query(`SELECT * FROM users WHERE email = ${email}`, function (error, results, fields) {
			if (results) {
				emailCheck = true;
			}
		});
		
		// console.log(a);
		// db.query(`SELECT * FROM users WHERE nickname = ${nickname}`, (error, result) => {
		// 	if (result) {
		// 		nicknameCheck = true;
		// 	}
		// });
	
		// if (emailCheck && nicknameCheck) {
		// 	res.status(409).json({
		// 		data: {
		// 			email: true,
		// 			nickname: true
		// 		},
		// 		message: "Both already existed!"
		// 	})
		// } else if (emailCheck) {
		// 	res.status(409).json({
		// 		data: {
		// 			email: true
		// 		},
		// 		message: "E-mail already existed!"
		// 	})
		// } else if (nicknameCheck) {
		// 	res.status(409).json({
		// 		data: {
		// 			nickname: true
		// 		},
		// 		message: "Nickname already existed!"
		// 	})
		// } else {
		// 	db.query(`INSERT INTO users (email, password, nickname, username) 
		// 	VALUES (?, ?, ?, ?})`, [email, password, nickname, username], (error, result) => {
		// 		if (error) {
		// 			res.status(500).json({ message: "sorry"})
		// 		} else {
		// 			res.status(200).json({ message: "Signup success!"})
		// 		}
		// 	})
		// }
	}
};
