// 각종 라우팅 설정

module.exports = {
  auth: require('./users/auth').get,
  signup: require('./users/signup').post,
  signin: require('./users/signin').post,
  signout: require('./users/signout'),
  post: require('./features/post').post,
  selectbook: require('./features/selectbook').post,
  postlist: require('./features/postlist').get,
  like: require('./features/like')
};
