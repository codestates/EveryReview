// 첫 화면은 해시태그 개수 상위 3개 - 시간순? 추천순?

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

    // hashtags table 값을 정렬시켜서 가장 count가 높은 순서대로 값을 가져오기

    // ORDER BY () DESC LIMIT 3
    // select posts.id, posts.content, posts.likes, posts.created_at, users.username, users.profile, books.url from ( ( posts inner join users on posts.user_id = users.id ) inner join books on books.id = posts.book_id ) WHERE hashtags.hashtag_name = OR

    // select hashtags.hashtag_name from ( ( posts inner join post_hashtag on post_hashtag.post_id = posts.id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id) ORDER BY hashtags.hashcount DESC LIMIT 3;

    let queryString = `select hashtag_name from hashtags order by hashcount desc limit 3`
    let [bestHashtags] = await connection0.query(queryString)
    connection0.commit()
    connection0.release()

    
    let bestHashdataQueryString = `select posts.id, posts.content, posts.user_id, posts.likes, posts.created_at, users.username, users.profile, hashtags.hashtag_name, books.url from ( ( ( ( posts inner join users on posts.user_id = users.id ) inner join post_hashtag on posts.id = post_hashtag.post_id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id ) inner join books on books.id = posts.book_id ) WHERE hashtags.hashtag_name = "${bestHashtags[0].hashtag_name}" OR  hashtags.hashtag_name = "${bestHashtags[1].hashtag_name}" OR hashtags.hashtag_name = "${bestHashtags[2].hashtag_name}" ORDER BY created_at DESC`
    let [postList] = await connection1.query(bestHashdataQueryString)
    connection1.commit()
    connection1.release()
    
    console.log("BH: ", postList)

    //! 복붙시작
    // // user정보 가져오기
    // queryString = `SELECT * FROM users WHERE email = "${email}"`
    // let [userInfo] = await connection0.query(queryString)
    // connection0.commit()
    // connection0.release()

    // let dataQueryString = `select posts.id, posts.content, posts.likes, posts.created_at, users.username, users.profile, books.url from ( ( posts inner join users on posts.user_id = users.id ) inner join books on books.id = posts.book_id ) ORDER BY created_at DESC`
    // let [postList] = await connection1.query(dataQueryString)
    // connection1.commit()
    // connection1.release()
    
    // console.log("postList: ", postList)
    // console.log("postList id: ", postList[0].id)

    // id가 서로 다른 경우에만 hash를 입력한다.
    let result = []

for(let i = 0; i < postList.length; i++) {
  let hashQueryString = `select hashtags.hashtag_name from ( ( posts inner join post_hashtag on post_hashtag.post_id = posts.id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id) WHERE posts.id = ${postList[i].id};`
  let [hash] = await connection2.query(hashQueryString)
  connection2.commit()
  connection2.release()
  let hashtag = hash.map((tag) => tag.hashtag_name)
  
  function a() {
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
  let b = a();

  result.push(b)
}
    
    res.status(200).json({ 
      data: "", message: "Explore Rendering success!"})
  }
};