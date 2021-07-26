// 각종 라우팅 설정

module.exports = {
  auth: require('./users/auth').get,
  signup: require('./users/signup').post,
  signin: {
    post: require('./users/signin').post,
    get: require('./users/signin').get,
  },
  mypage: require('./users/mypage').post,
  oauth: {
    get: require('./OAuth').get,
    post: require('./Oauth').post
  },
  post: require('./features/post').post,
  selectbook: require('./features/selectbook').post,
  postlist: require('./features/postlist').get,
  like: require('./features/like')
};
