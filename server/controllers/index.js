// 각종 라우팅 설정

module.exports = {
  auth: require('./users/auth').get,
  signup: require('./users/signup').post,
  signin: {
    post: require('./users/signin').post,
    get: require('./users/signin').get,
  },
  signout: require('./users/signout').get,
  mypage: require('./users/mypage').post,
  oauth: {
    get: require('./OAuth').get,
    post: require('./OAuth').post
  },
  post: require('./features/post').post,
  explore: require('./features/explore').post,
  postlist: require('./features/postlist').post,
  like: require('./features/like')
};
