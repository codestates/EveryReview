module.exports = {
  get: (req, res) => {
    res.cookie("accessToken", 'expired', {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: true,
      sameSite: "none"
    });
    res.cookie("refreshToken", 'bye', {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: true,
      sameSite: "none"
    });
    res.status(200).json({ message: 'signout success' });
  }
}