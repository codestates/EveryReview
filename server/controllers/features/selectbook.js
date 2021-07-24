const db = require('../../db');
const { isAuthorized } = require('../tokenFunctions')

// Naver API를 통한 책선택 기능구현
module.exports = {
  
  post: (req, res) => {
  // 한줄평에 들어가는 기능들을 req의 body로 전달받아서
  // method post에 대한 응답을 주고
  // 전달받은 req의 body는 post의 DB로 저장할 수 있게 해야함
  // 이 때 header는 access token을 가지고 있어야 하는가(로그인 된 상태인지를 인증할 수 있는 정보가 필요함)

  // req의 책을 선택하는 과정에서 books
  const { title, isbn, publisher, authors, url, thumbnail, contents } = req.body.data.bookInfo;
  const { content, hashtag } = req.body.data.postInfo;

  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    return res.json({ data: null, message: 'invalid access token' });
  }
  const { email, username } = accessTokenData;
  // 제목만 선택해도 관련 정보는 다 보내줘야함
    if( !title || !isbn || !publisher || !authors || !url ) {
      res.status(422).json({ message: "insufficient parameters supplied" })
    };
    // DB books에 등록하는 절차
    // 책 제목, 출판사, 작가는 중복 가능
    // isbn은 중복 불가
    db.promise().query(`SELECT * FROM books WHERE isbn = "${isbn}"`)
		.then( ([ book, fields ]) => {
			let isbnCheck = false;

			book.map((el) => {
				if (el.isbn === isbn) isbnCheck = true;
			})
      // 책을 DB에 등록하는 절차
      // 이미 등록된 책의 경우는 등록하지 않아도 됨
      // 그러나 유저가 책을 선택하는 것과는 무관하게 DB 쪽과 작동되어야 함

      // 책이 이미 있으면 저장 안해도 되지만, posts의 book_id를 입력시켜야 함(posts를 등록해야함)
			if (isbnCheck) {
        db.query(`SELECT * FROM users WHERE email = "${email}"`, (error, user) => {
          if(error) {
            console.log("error userInfo find: ", error)
            res.status(500).json({ message: "userInfo find error!!"})
          }
          else{
            db.query(`INSERT INTO posts (content, user_id, likes, book_id) VALUES (?, ?, ?, ?)`, [content, user[0].id, 0, book[0].id], (error, result) => {
              if (error) {
                res.status(500).json({ message: "post error!!(book already existed)"})
              } 
              else {
                res.status(200).json({ message: "post success!(book already existed)"})
              }
            })
          }
        })
			} 
      else {
        // 책이 없으면 책을 저장하고, 작가가 없으면 작가를 저장하고, book_author로 연결시켜줘야함
        db.query(`SELECT * FROM users WHERE email = "${email}"`, (error, user) => {
          if(error) {
            console.log("error userInfo find: ", error)
            res.status(500).json({ message: "userInfo find error!!"})
          }
          else {
            db.query(`INSERT INTO books (title, isbn, publisher, url, thumbnail, contents) VALUES (?, ?, ?, ?, ?, ?)`, [title, isbn, publisher, authors, url, thumbnail, contents], (error, result) => {
              if (error) {
                console.log("book insert error!!", error)
                res.status(500).json({ message: "Book regi error!!(book regi & author existed)"})
              } 
              else {
                db.query(`SELECT * FROM books WHERE isbn = "${isbn}"`, (error, newBook) => {
                  if(error) {
                    console.log("book insert now but find error!!", error)
                    res.status(500).json({ message: "Book find error!!(book regi now & author existed)"})
                  }
                  else {
    
                    // 작가가 있는지 확인하고, 작가가 있으면 book_author에 입력한다.
                    for(let i = 0; i < authors.length; i++) {
                      db.query(`SELECT * FROM authors WHERE name = "${authors[i]}"`, (error, author) => {
                        if(error) {
                          console.log("error author find: ", error)
                          res.status(500).json({ message: "author regi find error!!(book regi & author existed)"})
                        }
                        else if(author[0]){
                          db.query(`INSERT INTO book_author (book_id, author_id) VALUES ("${newBook[0].id}", "${author[0].id}")`, (error, result) => {
                            if(error) {
                              console.log("book insert error!!", error)
                              res.status(500).json({ message: "book_author regi error!!(book regi & author existed)"})
                            }
                            else {
                              db.query(`INSERT INTO posts (content, user_id, likes, book_id) VALUES (?, ?, ?, ?)`, [content, user[0].id, 0, newBook[0].id], (error, result) => {
                                if (error) {
                                  res.status(500).json({ message: "post error!!(book regi & author existed)"})
                                } 
                                else {
                                  res.status(200).json({ message: "post success, book regi & author find success!(book regi & author existed)" })
                                }
                              })
                            }
                          })
                        }
                        // 작가가 없으면, 작가를 등록하고, book_author에 입력한다.
                        else {
                          console.log("2author[0]: ", author[0])
                          console.log("2authors[i]: ", authors[i])
                          db.query(`INSERT INTO authors (name) VALUES ("${authors[i]}")`, (error, result) => {
                            if(error) {
                              console.log("author insert error!!", error)
                              res.status(500).json({ message: "author register error!!(book regi & author regi)"})
                            }
                            else {
                              for(let i = 0; i < authors.length; i++) {
                                db.query(`SELECT * FROM authors WHERE name = "${authors[i]}"`, (error, newAuthor) => {
                                  if(error) {
                                    console.log("error author find: ", error)
                                    res.status(500).json({ message: "author regi find error!!(book regi & author existed)"})
                                  }
                                  else {
                                    db.query(`INSERT INTO book_author (book_id, author_id) VALUES ("${newBook[0].id}", "${newAuthor[0].id}")`, (error, result) => {
                                      if(error) {
                                        console.log("book insert error!!", error)
                                        res.status(500).json({ message: "book_author register error!!(book regi & author regi)"})
                                      }
                                      else {
                                        db.query(`INSERT INTO posts (content, user_id, likes, book_id) VALUES (?, ?, ?, ?)`, [content, user[0].id, 0, newBook[0].id], (error, result) => {
                                          if (error) {
                                            res.status(500).json({ message: "post error!!(book regi & author regi)"})
                                          } 
                                          else {
                                            res.status(200).json({ message: "post success, book regi & author find success!(book regi & author regi)" })
                                          }
                                        })
                                      }
                                    })
    
                                  }
                                }
                              )}
                            }
                          })
                        }
                      })
                    }
                  }
                })
              }
            })

          }
        })
        // // 작가는 authors query로 보내기
        // // 작가 이름을 DB에 등록하는 절차
        // // req에 배열로 입력, 쿼리문 작성하기
        // for(let i = 0; i < authors.length; i++) {
        //   db.query(`SELECT * FROM authors WHERE name = "${authors[i]}"`, (error, result) => {
        //     if(error) {
        //       console.log("error author find: ", error)
        //       res.status(500).json({ message: "author register find error!!"})
        //     }
        // // author이 등록되어 있으면 책을 넣고, book_author에서 연결해줘야 함
        //     else if(result[0]) {
        //       db.query(`INSERT INTO books (title, isbn, publisher, url, thumbnail, contents) VALUES (?, ?, ?, ?, ?, ?)`, [title, isbn, publisher, authors, url, thumbnail, contents], (error, result) => {
        //         if (error) {
        //           res.status(500).json({ message: "Book register error!!"})
        //         } else {
        //           db.query(`INSERT INTO book_author (book_id, author_id)`)
        //           res.status(200).json({ message: "Book and Author register success!"})
        //         }
        //       })
        //     }
        //       db.query(`INSERT INTO authors (name) VALUES ("${authors[i]}")`, (error, result) => {
        //         if (error) {
        //           console.log("error author insert: ", error)
        //           res.status(500).json({ message: "author register insert error!!"})
        //         }
        //       })
        //     }
        //   )}
        //   db.query(`INSERT INTO books (title, isbn, publisher, url, thumbnail, contents) VALUES (?, ?, ?, ?, ?, ?)`, [title, isbn, publisher, authors, url, thumbnail, contents], (error, result) => {
        //     if (error) {
        //       res.status(500).json({ message: "Book register error!!"})
        //     } else {
        //       res.status(200).json({ message: "Book and Author register success!"})
        //     }
        //   })
			}
		})
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Sorry, we have an issue!" })
    })

  }
};