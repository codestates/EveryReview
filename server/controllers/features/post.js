const db = require('../../db');

// 한 줄평 등록하는 기능
module.exports = {
  
  post: (req, res) => {
    // 한줄평에 들어가는 기능들을 req의 body로 전달받아서
    // method post에 대한 응답을 주고
    // 전달받은 req의 body는 post의 DB로 저장할 수 있게 해야함
    // 이 때 header는 access token을 가지고 있어야 하는가(로그인 된 상태인지를 인증할 수 있는 정보가 필요함)
  
    // req의 책을 선택하는 과정에서 books
    const { title, isbn, publisher, authors, url, thumbnail, contents } = req.body;
  
    // 제목만 선택해도 관련 정보는 다 보내줘야함
      if( !title || !isbn || !publisher || !authors || !url ) {
        res.status(422).json({ message: "insufficient parameters supplied" })
      };
      // DB books에 등록하는 절차
      // 책 제목, 출판사, 작가는 중복 가능
      // isbn은 중복 불가
      db.promise().query(`SELECT * FROM books WHERE isbn = "${isbn}"`)
      .then( ([ rows, fields ]) => {
			// 작가는 authors query로 보내기
        // 작가 이름을 DB에 등록하는 절차
    // req에 배열로 입력, 쿼리문 작성하기
    for(let i = 0; i < authors.length; i++) {
      db.query(`INSERT INTO authors (name) VALUES ("${authors[i]}")`, (error, result) => {
      })
    }
    db.query(`INSERT INTO books (title, isbn, publisher, url, thumbnail, contents) VALUES (?, ?, ?, ?, ?, ?)`, [title, isbn, publisher, authors, url, thumbnail, contents], (error, result) => {
      res.status(201).json({message: "Book register success!"})
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: "Sorry, we have an issue!" })
  })

  }
};