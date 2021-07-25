// 각종 라우팅 설정

module.exports = {
  auth: require('./users/auth').get,
  signup: require('./users/signup').post,
  signin: {
    post: require('./users/signin').post,
    get: require('./users/signin').get,
  },
  auth: require('./users/auth').get,
  mypage: require('./users/mypage').post,
  oauth: {
    get: require('./OAuth').get,
    post: require('./Oauth').post
  }
};
