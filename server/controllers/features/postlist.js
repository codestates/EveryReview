// 게시된 한 줄평들을 보여주는 기능
const { isAuthorized } = require('../tokenFunctions')
const mysql = require('mysql2/promise');

module.exports = {

  post: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.status(401).json({ data: null, message: 'invalid access token' });
    }

    const hashtag = req.body.data.hashInfo;

    if (hashtag.length === 0) {

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
      for (let i = 0; i < postList.length; i++) {
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
          obj.created_at = postList[i].created_at;
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
        data: data, message: "postList Rendering success!"
      })
    }
    else {
      //! hashtag 선택 시 접근하는 코드
      // 1. 처음 Explore에 들어온 경우 : best hashtags top 10만 목록으로 보여줌
      // 2. 이후 유저가 특정 해시 태그를 선택할 경우, 그 정보가 req.body.data.postInfo에 담겨서 오고
      // 3. 그것들을 바탕으로 해당 해시태그 목록에 해당하는 게시물 정보를 보내주면 된다.

      if (!req.body.data.hashInfo) res.status(422).json({ data: null, message: "잘못된 접근이다!" })

      if (hashtag.length === 0) res.status(422).json({ data: null, message: "Hashtag가 선택되지 않았습니다!" })

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
      // 1. 해시태그 테이블에서 해시태그 이름을 해시태그가 카운트 된 순서로 최대 10개를 가져온다.
      // 2. 가져온 해시태그 이름을 기준으로 해당 포스트를 가져와야하는데 문제는 포스트에 설정된 해시태그가 겹쳐서 하나의 포스트가 여러번 가져오는 것이다.
      // 3. 이것을 해결하려면 해시태그 기준으로 가져온 포스트를 중복되지 않게 만들어줘야한다.

      //! 상위 hashtags를 기반으로 posts.id를 중복되지 않게 가져오기(문제 2 해결!)
      let bestPostIdQueryString = `SELECT DISTINCT posts.id FROM ( ( posts INNER JOIN post_hashtag ON posts.id = post_hashtag.post_id ) INNER JOIN hashtags ON hashtags.id = post_hashtag.hashtag_id ) WHERE hashtags.hashtag_name IN (?) ORDER BY created_at DESC`
      let [postIdList] = await connection1.query(bestPostIdQueryString, [hashtag])
      connection1.commit()
      connection1.release()
      //! 가져온 posts.id를 하나의 배열에 담기(bulk insert)
      let postIdArr = [];
      for (let el of postIdList) {
        postIdArr.push(el.id)
      }
      //! postList 관련 정보를 postid를 기반으로 가져오기
      let dataQueryString = `SELECT posts.id, posts.content, posts.likes, posts.created_at, users.username, users.profile, books.url FROM ( ( posts INNER JOIN users ON posts.user_id = users.id ) INNER JOIN books ON books.id = posts.book_id ) WHERE posts.id in (?) ORDER BY created_at DESC`
      let [bestPostList] = await connection2.query(dataQueryString, [postIdArr])
      connection2.commit()
      connection2.release()

      //! postList 관련 정보(객체 형식) + hashtags(배열형식으로 입력)
      let data = []
      for (let i = 0; i < bestPostList.length; i++) {
        let hashQueryString = `SELECT hashtags.hashtag_name FROM ( ( posts INNER JOIN post_hashtag ON post_hashtag.post_id = posts.id ) INNER JOIN hashtags ON hashtags.id = post_hashtag.hashtag_id) WHERE posts.id = ${bestPostList[i].id};`
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
        data: data, message: "Explore Rendering success!"
      })

    }
  }
}