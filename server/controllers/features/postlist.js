// 게시된 한 줄평들을 보여주는 기능
const { isAuthorized } = require('../tokenFunctions')
const mysql = require('mysql2/promise');

module.exports = {
  
  post: async (req, res) => {
  
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.json({ data: null, message: 'invalid access token' });
    }
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
    
    const connection1 = await db.getConnection(async conn => conn);
    const connection2 = await db.getConnection(async conn => conn);

    connection1.beginTransaction()
    connection2.beginTransaction()

    let dataQueryString = `
      SELECT posts.id, posts.content, posts.likes, posts.created_at, users.username, users.profile, books.url 
      FROM ( ( posts INNER JOIN users ON posts.user_id = users.id ) 
      INNER JOIN books ON books.id = posts.book_id ) 
      ORDER BY created_at DESC`
    let [postList] = await connection1.query(dataQueryString)
    connection1.commit()
    connection1.release()

    // id가 서로 다른 경우에만 hash를 입력한다.
    let data = []
    for(let i = 0; i < postList.length; i++) {
      let hashQueryString = `
        SELECT hashtags.hashtag_name 
        FROM ( ( posts INNER JOIN post_hashtag ON post_hashtag.post_id = posts.id ) 
        INNER JOIN hashtags ON hashtags.id = post_hashtag.hashtag_id) 
        WHERE posts.id = ${postList[i].id};`
      let [hash] = await connection2.query(hashQueryString)
      connection2.commit()
      connection2.release()
      let hashtag = hash.map((tag) => tag.hashtag_name)
      
      function makeDataObj() {
            let obj = {};
            obj.id = postList[i].id;
            obj.content = postList[i].content;
            obj.likes = postList[i].likes;
            obj.creatd_at = postList[i].created_at;
            obj.username = postList[i].username;
            obj.profile = postList[i].profile;
            obj.url = postList[i].url;
            obj.hashtag_name = hashtag;

            return obj;
      }
      let dataObj = makeDataObj();
      data.push(dataObj)
    }
    res.status(200).json({ 
      data: data, message: "postList Rendering success!"})
    }
  };
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