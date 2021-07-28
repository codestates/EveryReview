// 첫 화면은 해시태그 개수 상위 3개 - 시간순? 추천순?

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
    
    const connection0 = await db.getConnection(async conn => conn);
    const connection1 = await db.getConnection(async conn => conn);
    const connection2 = await db.getConnection(async conn => conn);
    const connection3 = await db.getConnection(async conn => conn);

    connection0.beginTransaction()
    connection1.beginTransaction()
    connection2.beginTransaction()
    connection3.beginTransaction()
    
    // 가장 많이 언급된 해시태그 3개를 선택해 이 글들이 포함된 글을 최신순으로 보여줘야 함
    // 1. 해시태그 테이블에서 해시태그 이름을 해시태그가 카운트 된 순서로 최대 3개를 가져온다.
    // 2. 가져온 해시태그 이름을 기준으로 해당 포스트를 가져와야하는데 문제는 포스트에 설정된 해시태그가 겹쳐서 하나의 포스트가 여러번 가져오는 것이다.
    // 3. 이것을 해결하려면 해시태그 기준으로 가져온 포스트를 중복되지 않게 만들어줘야한다.
    
    //! hashcount를 기준으로 hashtags에 있는 상위 3개 rows 가져오기
    let bestHashQueryString = `SELECT * FROM hashtags ORDER BY hashcount DESC LIMIT 3`
    let [bestHashtags] = await connection0.query(bestHashQueryString)
    connection0.commit()
    connection0.release()
    let bestHashtagsArr = [];
    for(let el of bestHashtags) {
      bestHashtagsArr.push(el.id)
    }
    
    //! 상위 hashtags를 기반으로 posts.id를 중복되지 않게 가져오기(문제 2 해결!)
    let bestPostIdQueryString = `
      SELECT DISTINCT posts.id 
      FROM ( ( posts INNER JOIN post_hashtag ON posts.id = post_hashtag.post_id ) 
      INNER JOIN hashtags ON hashtags.id = post_hashtag.hashtag_id ) 
      WHERE hashtags.id IN (?) 
      ORDER BY created_at DESC`
    let [postIdList] = await connection1.query(bestPostIdQueryString, [bestHashtagsArr])
    connection1.commit()
    connection1.release()
    //! 가져온 posts.id를 하나의 배열에 담기(bulk insert)
    let postIdArr = [];
    for(let el of postIdList) {
      postIdArr.push(el.id)
    }
    //! postList 관련 정보를 postid를 기반으로 가져오기
    let dataQueryString = `
      SELECT posts.id, posts.content, posts.likes, posts.created_at, users.username, users.profile, books.url 
      FROM ( ( posts INNER JOIN users ON posts.user_id = users.id ) 
      INNER JOIN books ON books.id = posts.book_id ) 
      WHERE posts.id in (?) 
      ORDER BY created_at DESC`
    let [bestPostList] = await connection2.query(dataQueryString, [postIdArr])
    connection2.commit()
    connection2.release()
    
    //! postList 관련 정보(객체 형식) + hashtags(배열형식으로 입력)
    let data = []
    for(let i = 0; i < bestPostList.length; i++) {
      let hashQueryString = `
        SELECT hashtags.hashtag_name 
        FROM ( ( posts INNER JOIN post_hashtag ON post_hashtag.post_id = posts.id ) 
        INNER JOIN hashtags ON hashtags.id = post_hashtag.hashtag_id) 
        WHERE posts.id = ${bestPostList[i].id};`
      let [hash] = await connection3.query(hashQueryString, [postIdArr])
      connection3.commit()
      connection3.release()

      let hashtag = hash.map((tag) => tag.hashtag_name)
      
      function makeDataObj() {
        let obj = {};
        obj.id = bestPostList[i].id;
        obj.content = bestPostList[i].content;
        obj.likes = bestPostList[i].likes;
        obj.creatd_at = bestPostList[i].created_at;
        obj.username = bestPostList[i].username;
        obj.profile = bestPostList[i].profile;
        obj.url = bestPostList[i].url;
        obj.hashtag_name = hashtag;
        
        return obj;
      }
      let dataObj = makeDataObj();
      data.push(dataObj)
    }
    // console.log("data: ", data)
    
    res.status(200).json({ 
      data: data, message: "Explore Rendering success!"})
    }
  };
  
  // hashtags table 값을 정렬시켜서 가장 count가 높은 순서대로 값을 가져오기

  // ORDER BY () DESC LIMIT 3
  // select posts.id, posts.content, posts.likes, posts.created_at, users.username, users.profile, books.url from ( ( posts inner join users on posts.user_id = users.id ) inner join books on books.id = posts.book_id ) WHERE hashtags.hashtag_name = OR

  // select hashtags.hashtag_name from ( ( posts inner join post_hashtag on post_hashtag.post_id = posts.id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id) ORDER BY hashtags.hashcount DESC LIMIT 3;
  
  // let bestHashdataQueryString = `select posts.id, posts.content, posts.user_id, posts.likes, posts.created_at, users.username, users.profile, hashtags.hashtag_name, books.url from ( ( ( ( posts inner join users on posts.user_id = users.id ) inner join post_hashtag on posts.id = post_hashtag.post_id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id ) inner join books on books.id = posts.book_id ) WHERE hashtags.hashtag_name = "${bestHashtags[0].hashtag_name}" OR  hashtags.hashtag_name = "${bestHashtags[1].hashtag_name}" OR hashtags.hashtag_name = "${bestHashtags[2].hashtag_name}" ORDER BY created_at DESC`
  
  // select posts.id, hashtags.hashtag_name from ( ( posts inner join post_hashtag on posts.id = post_hashtag.post_id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id ) WHERE hashtags.hashtag_name = "hashtag Something6" OR  hashtags.hashtag_name = "hashtag Something5" OR hashtags.hashtag_name = "hashtag Something4" ORDER BY created_at DESC
  // select DISTINCT posts.id from ( ( posts inner join post_hashtag on posts.id = post_hashtag.post_id ) inner join hashtags on hashtags.id = post_hashtag.hashtag_id ) WHERE hashtags.hashtag_name = "hashtag Something6" OR  hashtags.hashtag_name = "hashtag Something5" OR hashtags.hashtag_name = "hashtag Something4" ORDER BY created_at DESC