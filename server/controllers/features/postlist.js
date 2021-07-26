
// 게시된 한 줄평들을 보여주는 기능
const { isAuthorized } = require('../tokenFunctions')
const mysql = require('mysql2/promise');

module.exports = {
  
  post: async (req, res) => {

    // const { title, isbn, publisher, authors, url, thumbnail, contents } = req.body.data.bookInfo;
    // const { content, hashtag } = req.body.data.postInfo;
  
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.json({ data: null, message: 'invalid access token' });
    }
    const { email, username } = accessTokenData;
    // 제목만 선택해도 관련 정보는 다 보내줘야함

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

    let dataQueryString = `select posts.id, posts.content, posts.user_id, posts.likes, posts.created_at, users.username, users.profile, hashtags.hashtag_name, books.url from ( ( ( ( posts inner join users on posts.user_id = users.id ) inner join post_hashtag on posts.id = post_hashtag.post_id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id ) inner join books on books.id = posts.book_id )`
    let [postList] = await connection1.query(dataQueryString)
    console.log("postList: ", postList)
    connection1.commit()
    connection1.release()
    

    // 필요한 데이터들을 적어보자
    // list 구현에 필요한 것
    // 1. userInfo : username, profile(default: null)
    // 2. postInfo : content, user_id, likes, created_at
    // 3. hashInfo : hashtag_name
    // 4. bookInfo : url

    // posts + users
    // `select posts.id, posts.content, posts.user_id, posts.likes, posts.created_at, users.username, users.profile from posts inner join users on posts.user_id = users.id;`

    // posts + users + hashtags
    // `select posts.id, posts.content, posts.user_id, posts.likes, posts.created_at, users.username, users.profile, hashtags.hashtag_name from ( ( ( posts inner join users on posts.user_id = users.id ) inner join post_hashtag on posts.id = post_hashtag.post_id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id);`

    // posts + users + hashtags + books
    // select posts.id, posts.content, posts.user_id, posts.likes, posts.created_at, users.username, users.profile, hashtags.hashtag_name, books.url from ( ( ( ( posts inner join users on posts.user_id = users.id ) inner join post_hashtag on posts.id = post_hashtag.post_id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id ) inner join books on books.id = posts.book_id )

    


    res.status(200).json({ message: "post success!"})
  }
};