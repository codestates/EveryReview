// 첫 화면은 해시태그 개수 상위 3개 - 시간순? 추천순?

const { isAuthorized } = require('../tokenFunctions')
const mysql = require('mysql2/promise');

module.exports = {
  
  // 1. 처음 Explore에 들어온 경우 : best hashtags top 10만 목록으로 보여줌
  // 2. 이후 유저가 특정 해시 태그를 선택할 경우, 그 정보가 req.body.data.postInfo에 담겨서 오고
  // 3. 그것들을 바탕으로 해당 해시태그 목록에 해당하는 게시물 정보를 보내주면 된다.
  get: async (req, res) => {

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
    // 1. 해시태그 테이블에서 해시태그 이름을 해시태그가 카운트 된 순서로 최대 10개를 가져온다.
    // 2. 가져온 해시태그 이름을 기준으로 해당 포스트를 가져와야하는데 문제는 포스트에 설정된 해시태그가 겹쳐서 하나의 포스트가 여러번 가져오는 것이다.
    // 3. 이것을 해결하려면 해시태그 기준으로 가져온 포스트를 중복되지 않게 만들어줘야한다.
    
    //! hashcount를 기준으로 hashtags에 있는 상위 3개 rows 가져오기
    let bestHashQueryString = `SELECT * FROM hashtags ORDER BY hashcount DESC LIMIT 10`
    let [bestHashtags] = await connection0.query(bestHashQueryString)
    connection0.commit()
    connection0.release()
    let bestHashtagsArr = [];
    for(let el of bestHashtags) {
      bestHashtagsArr.push(el.hashtag_name)
    }
    res.status(200).json({ data: bestHashtagsArr, message: "Best TOP 10 HashList responsed!" })
  }
};