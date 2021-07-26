// const db = require('../../db');
const { isAuthorized } = require('../tokenFunctions')
const mysql = require('mysql2/promise');



// Naver API를 통한 책선택 기능구현
module.exports = {
  
  post: async (req, res) => {

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

    const db = mysql.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      connectTimeout: 10000,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    })
    
    const connection0 = await db.getConnection(async conn => conn);
    const connection1 = await db.getConnection(async conn => conn);
    const connection2 = await db.getConnection(async conn => conn);
    const connection3 = await db.getConnection(async conn => conn);
    const connection4 = await db.getConnection(async conn => conn);
    const connection5 = await db.getConnection(async conn => conn);
    const connection6 = await db.getConnection(async conn => conn);
    const connection7 = await db.getConnection(async conn => conn);
    const connection8 = await db.getConnection(async conn => conn);

    connection0.beginTransaction()
    connection1.beginTransaction()
    connection2.beginTransaction()
    connection3.beginTransaction()
    connection4.beginTransaction()
    connection5.beginTransaction()
    connection6.beginTransaction()
    connection7.beginTransaction()
    connection8.beginTransaction()

    // user정보 가져오기
    let queryString = `SELECT * FROM users WHERE email = "${email}"`
    let [userInfo] = await connection0.query(queryString)
    connection0.commit()
    connection0.release()

    // books 정보 DB에 입력
    queryString = `INSERT IGNORE INTO books (title, isbn, publisher, url, thumbnail, contents) VALUES (?, ?, ?, ?, ?, ?)`
    let queryValue = [title, isbn, publisher, url, thumbnail, contents]
    let bookInsert = await connection1.query(queryString, queryValue)
    connection1.commit()
    connection1.release()

    // authors 정보 DB에 입력
    for(let i = 0; i < authors.length; i++) {
      try{
        let connection = await db.getConnection(async conn => conn)
        await connection.query(`INSERT IGNORE INTO authors (name) VALUES ("${authors[i]}")`)
        connection.commit()
        connection.release()
      }
      catch(error){
        console.log("error: ", error)
      }
    }
    
    //  book_author 정보 DB에 입력
      // bookInfo와 authorInfo 가져오기
    let booksQueryString = `SELECT * FROM books WHERE isbn = "${isbn}"`
    let authorsQueryString = `SELECT * FROM authors WHERE name IN (?)`
    let [bookInfo] = await connection2.query(booksQueryString)
    let [authorInfo] = await connection3.query(authorsQueryString, [authors])
    // console.log("------", bookInfo[0].id, authorInfo)
    connection2.commit()
    connection2.release()
    connection3.commit()
    connection3.release()
      // book_author 정보 DB에 입력하기
    for(let i = 0; i < authors.length; i++) {
      try{
        let connection = await db.getConnection(async conn => conn)
        connection.beginTransaction()
        await connection.query(`INSERT IGNORE INTO book_author (book_id, author_id) VALUES ("${bookInfo[0].id}", "${authorInfo[i].id}")`)
        connection.commit()
        connection.release()
      }
      catch(error){
        console.log("error: ", error)
      }
    }
    
    // posts 정보 DB에 입력
    queryString = `INSERT INTO posts (content, user_id, likes, book_id) VALUES (?, ?, ?, ?)`;
    queryValue = [content, userInfo[0].id, 7777, bookInfo[0].id]
    // console.log(queryString)
    let postInsert = await connection4.query(queryString, queryValue)
    connection4.commit()
    connection4.release()
    
    // hashtags 정보 DB에 입력
    for(let i = 0; i < hashtag.length; i++) {
      try{
        let connection = await db.getConnection(async conn => conn)
        await connection.query(`INSERT IGNORE INTO hashtags (hashtag_name) VALUES ("${hashtag[i]}")`)
        connection.commit()
        connection.release()
      }
      catch(error){
        console.log("error: ", error)
      }
    }

    // post_hashtag 정보 DB에 입력
    // postInfo와 hashInfo 가져오기
  let postsQueryString = `select * from posts where content = ? and user_id = ? and book_id = ? order by created_at desc limit 1`
  let postsQueryValue = [content, userInfo[0].id, bookInfo[0].id]
  let hashsInfoQueryString = `SELECT * FROM hashtags WHERE hashtag_name IN (?)`
  let [postInfo] = await connection5.query(postsQueryString, postsQueryValue)
  let [hashInfo] = await connection6.query(hashsInfoQueryString, [hashtag])
  // console.log("----", hashInfo)
  connection5.commit()
  connection5.release()
  connection6.commit()
  connection6.release()
    // post_hashtag 정보 DB에 입력하기
  for(let i = 0; i < hashtag.length; i++) {
    try{
      let connection = await db.getConnection(async conn => conn)
      await connection.query(`INSERT IGNORE INTO post_hashtag (post_id, hashtag_id) VALUES  ("${postInfo[0].id}", "${hashInfo[i].id}")`)
      connection.commit()
      connection.release()
    }
    catch(error){
      console.log("error: ", error)
    }
  }
    res.status(200).json({ message: "post success!"})


  // 한줄평에 들어가는 기능들을 req의 body로 전달받아서
  // method post에 대한 응답을 주고
  // 전달받은 req의 body는 post의 DB로 저장할 수 있게 해야함
  // 이 때 header는 access token을 가지고 있어야 하는가(로그인 된 상태인지를 인증할 수 있는 정보가 필요함)

  // req의 책을 선택하는 과정에서 books
  // const { title, isbn, publisher, authors, url, thumbnail, contents } = req.body.data.bookInfo;
  // const { content, hashtag } = req.body.data.postInfo;

  // const accessTokenData = isAuthorized(req);
  // if (!accessTokenData) {
  //   return res.json({ data: null, message: 'invalid access token' });
  // }
  // const { email, username } = accessTokenData;
  // // 제목만 선택해도 관련 정보는 다 보내줘야함
  //   if( !title || !isbn || !publisher || !authors || !url ) {
  //     res.status(422).json({ message: "insufficient parameters supplied" })
  //   };

  //   db.promise().query(`INSERT IGNORE INTO books (title, isbn, publisher, url, thumbnail, contents) VALUES (?, ?, ?, ?, ?, ?)`, [title, isbn, publisher, url, thumbnail, contents])
  //   .then(([rows, fields]) => {
  //     console.log("rows1: ", rows)
  //     return
  //   })
  //   .db.promise().query(`INSERT IGNORE INTO authors (name) VALUES ?`, [[authors]])
  //   .then(([rows, fields]) => {
  //     console.log("rows2: ", rows)
  //     res.status(200).json({ message: "insert complite"})
  //   })
  //   .catch(error => {
  //     throw error
  //   })






    // DB books에 등록하는 절차
    // 책 제목, 출판사, 작가는 중복 가능
    // isbn은 중복 불가
    // db.promise().query(`SELECT * FROM books WHERE isbn = "${isbn}"`)
		// .then( ([ book, fields ]) => {
		// 	let isbnCheck = false;

		// 	book.map((el) => {
		// 		if (el.isbn === isbn) isbnCheck = true;
		// 	})
    //   // 책을 DB에 등록하는 절차
    //   // 이미 등록된 책의 경우는 등록하지 않아도 됨
    //   // 그러나 유저가 책을 선택하는 것과는 무관하게 DB 쪽과 작동되어야 함

    //   // 책이 이미 있으면 저장 안해도 되지만, posts의 book_id를 입력시켜야 함(posts를 등록해야함)
		// 	if (isbnCheck) {
    //     db.query(`SELECT * FROM users WHERE email = "${email}"`, (error, user) => {
    //       if(error) {
    //         console.log("error userInfo find: ", error)
    //         res.status(500).json({ message: "userInfo find error!!"})
    //       }
    //       else{
    //         db.query(`INSERT IGNORE INTO posts (content, user_id, likes, book_id) VALUES (?, ?, ?, ?)`, [content, user[0].id, 0, book[0].id], (error, result) => {
    //           if (error) {
    //             res.status(500).json({ message: "post error!!(book already existed)"})
    //           } 
    //           else {
    //             res.status(200).json({ message: "post success!(book already existed)"})
    //           }
    //         })
    //       }
    //     })
		// 	} 
    //   else {
    //     // 책이 없으면 책을 저장하고, 작가가 없으면 작가를 저장하고, book_author로 연결시켜줘야함
    //     db.query(`SELECT * FROM users WHERE email = "${email}"`, (error, user) => {
    //       if(error) {
    //         console.log("error userInfo find: ", error)
    //         res.status(500).json({ message: "userInfo find error!!"})
    //       }
    //       else {
    //         db.query(`INSERT IGNORE INTO books (title, isbn, publisher, url, thumbnail, contents) VALUES (?, ?, ?, ?, ?, ?)`, [title, isbn, publisher, url, thumbnail, contents], (error, result) => {
    //           if (error) {
    //             console.log("book insert error!!", error)
    //             res.status(500).json({ message: "Book regi error!!(book regi & author existed)"})
    //           } 
    //           else {
    //             db.query(`SELECT * FROM books WHERE isbn = "${isbn}"`, (error, newBook) => {
    //               if(error) {
    //                 console.log("book insert now but find error!!", error)
    //                 res.status(500).json({ message: "Book find error!!(book regi now & author existed)"})
    //               }
    //               else {
    //               // insert는 다 요청하고, ignore로 동일한 데이터 방지시키기
    //               // 작가를 등록하고, book_author에 입력한다.
    //                     const authorList = authors.map((el) => [el])
    //                     console.log("authorList: ", authorList)
    //                   db.query(`INSERT IGNORE INTO authors (name) VALUES ?`, [[authors]], (error, result) => {
    //                     if(error) {
    //                       console.log("author insert error!!", error)
    //                       res.status(500).json({ message: "author register error!!(book regi & author regi)"})
    //                     }
    //                     else {
    //                         db.query(`SELECT * FROM authors WHERE name = "${authors[i]}"`, (error, newAuthor) => {
    //                           if(error) {
    //                             console.log("error author find: ", error)
    //                             res.status(500).json({ message: "author regi find error!!(book regi & author existed)"})
    //                           }
    //                           else {
    //                             db.query(`INSERT INTO book_author (book_id, author_id) VALUES ("${newBook[0].id}", "${newAuthor[0].id}")`, (error, result) => {
    //                               if(error) {
    //                                 console.log("book insert error!!", error)
    //                                 res.status(500).json({ message: "book_author register error!!(book regi & author regi)"})
    //                               }
    //                               else {
    //                                 db.query(`INSERT INTO posts (content, user_id, likes, book_id) VALUES (?, ?, ?, ?)`, [content, user[0].id, 0, newBook[0].id], (error, result) => {
    //                                   if (error) {
    //                                     res.status(500).json({ message: "post error!!(book regi & author regi)"})
    //                                   } 
    //                                   else {
    //                                         db.query(`SELECT * FROM hashtags WHERE hashtag_name = "${hashtag[i]}"`, (error, hashtagDB) => {
    //                                           if(error) {
    //                                             console.log("error hashtag find: ", error)
    //                                             return res.status(500).json({ message: "hashtag find error!!"})
    //                                           }
    //                                           // 해시태그가 DB에 저장되어 있는 경우
    //                                           else if(hashtagDB[0]){
    //                                             db.query(`select * from posts where content = ? and user_id = ? and book_id = ? order by created_at desc limit 1`, [content, user[0].id, newBook[0].id], (error, newPost) => {
    //                                               if(error) {
    //                                                 return res.status(500).json({ message: "hashtag find error!!(hashtag already existed)"})
    //                                               }
    //                                               else {
    //                                                 db.query(`INSERT INTO post_hashtag (post_id, hashtag_id) VALUES ("${newPost[0].id}", "${hashtagDB[0].id}")`, (error, result) => {
    //                                                   if(error) {
    //                                                     console.log("error hashtag insert: ", error)
    //                                                     return res.status(500).json({ message: "post_hashtag insert error!!(hashtag already existed)"})
    //                                                   }
    //                                                   else if(i === hashtag.length - 1){
    //                                                     return res.status(200).json({ message: "post success!(book & hashtag already existed)"})
    //                                                   }
    //                                                 })
    //                                               }
    //                                             })
    //                                           }
    //                                           // 해시태그가 DB에 없어서 등록해야하는 경우
    //                                           else {
    //                                             db.query(`select * from posts where content = ? and user_id = ? and book_id = ? order by created_at desc limit 1`, [content, user[0].id, newBook[0].id], (error, newPost) => {
    //                                               if(error) {
    //                                                 return res.status(500).json({ message: "hashtag find error!!(hashtag regi)"})
    //                                               }
    //                                               else {
    //                                                 console.log("----insert into hashtag3", hashtag[i])
    //                                                 db.query(`INSERT INTO hashtags (hashtag_name) VALUES ("${hashtag[i]}")`, (error, result) => {
    //                                                   if(error) {
    //                                                     console.log("error hashtag insert3: ", error)
    //                                                     return res.status(500).json({ message: "hashtags insert error!!(hashtag regi)"})
    //                                                   }
    //                                                   else {
    //                                                     db.query(`SELECT * FROM hashtags WHERE hashtag_name = "${hashtag[i]}"`, (error, hashtagDB) => {
    //                                                       if(error) {
    //                                                         console.log("error hashtag insert: ", error)
    //                                                         return res.status(500).json({ message: "post_hashtag insert error!!(hashtag already existed)"})
    //                                                       }
    //                                                       else {
    //                                                         db.query(`INSERT INTO post_hashtag (post_id, hashtag_id) VALUES ("${newPost[0].id}", "${hashtagDB[0].id}")`, (error, result) => {
    //                                                           if(error) {
    //                                                             console.log("error hashtag insert: ", error)
    //                                                             return res.status(500).json({ message: "post_hashtag insert error!!(hashtag already existed)"})
    //                                                           }
    //                                                           else if(i === hashtag.length - 1) {
    //                                                             return res.status(200).json({ message: "post success, book regi & author find success!(book regi & author regi)"})
    //                                                           }
    //                                                         })
    //                                                       }
    //                                                     })
    //                                                   }
    //                                                 })
    //                                               }
    //                                             })
    //                                           }
    //                                         })
    //                                       }
    //                                 })
    //                               }
    //                             })

    //                           }
    //                         }
    //                       )}
    //                     })
    //               }
    //             })
    //           }
    //         })

    //       }
    //     })
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
		// 	}
		// })
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).json({ message: "Sorry, we have an issue!" })
    // })

  }
};