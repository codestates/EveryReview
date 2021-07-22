// 각종 라우팅 설정

module.exports = {
  auth: require('./users/auth'),
  signup: require('./users/signup'),
  signin: require('./users/signin'),
  signout: require('./users/signout')
};
