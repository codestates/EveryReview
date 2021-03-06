require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  // RefreshToken 생성
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },
  // RefreshToken 전달
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: true,
      sameSite: "none"
    });
  },
  // AccessToken 생성
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },
  // AccessToken 전달
  sendAccessToken: (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1,
      secure: true,
      sameSite: "none"
    });
    res.status(200).json({ message: "AccessToken published" });
  },
  // AccessToken 만료시 재생성된 토큰 전달, 이 때, 유저 정보를 같이 전송
  resendAccessToken: (res, accessToken, data) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1,
      secure: true,
      sameSite: "none"
    });
    res.json({ data: data, message: "ok" });
  },
  // AccessToken 검증
  isAuthorized: (req) => {
    const authorization = req.cookies.accessToken;
    if (!authorization) {
      return null;
    }
    const token = authorization;
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      return null;
    }
  },
  // RefreshToken 검증
  checkRefreshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  },
};