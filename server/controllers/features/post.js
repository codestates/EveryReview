const { isAuthorized } = require('../tokenFunctions')
const mysql = require('mysql2/promise');

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

    // authors 정보 DB에 입력(connection을 덜 보내도록 수정해보기)
    for(let i = 0; i < authors.length; i++) {
      let connection = await db.getConnection(async conn => conn)
      await connection.query(`INSERT IGNORE INTO authors (name) VALUES ("${authors[i]}")`)
      connection.commit()
      connection.release()
    }
    
    //  book_author 정보 DB에 입력
      // bookInfo와 authorInfo 가져오기
    let booksQueryString = `SELECT * FROM books WHERE isbn = "${isbn}"`
    let authorsQueryString = `SELECT * FROM authors WHERE name IN (?)`
    let [bookInfo] = await connection2.query(booksQueryString)
    let [authorInfo] = await connection3.query(authorsQueryString, [authors])
    connection2.commit()
    connection2.release()
    connection3.commit()
    connection3.release()
    
    // book_author 정보 DB에 입력하기(connection을 덜 보내도록 수정해보기)
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
    
    //! hashtag 선택하지 않았을 경우 제외시키기
    //! query에서 찾는 값이 없을 경우 빈배열 입력됨
    if(hashtag.length !== 0) {
      // hashtags 정보 DB에 입력(connection을 덜 보내도록 수정해보기)
      for(let i = 0; i < hashtag.length; i++) {
        try{
          let connection = await db.getConnection(async conn => conn)
          let connection1 = await db.getConnection(async conn => conn)
          
          await connection.query(`INSERT IGNORE INTO hashtags (hashtag_name) VALUES ("${hashtag[i]}")`)
          connection.commit()
          connection.release()
          await connection.query(`UPDATE hashtags SET hashcount=hashcount+1 WHERE hashtag_name = "${hashtag[i]}"`)
          connection1.commit()
          connection1.release()
        }
        catch(error){
          console.log("error: ", error)
        }
      }
  
      // post_hashtag 정보 DB에 입력
      // postInfo와 hashInfo 가져오기
      let postsQueryString = `SELECT * FROM posts WHERE content = ? AND user_id = ? AND book_id = ? ORDER BY created_at DESC LIMIT 1`
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
    }
    res.status(200).json({ message: "post success!"})
  }
};