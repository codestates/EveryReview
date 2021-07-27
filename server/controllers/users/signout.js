module.exports = {
  get: (req, res) => {
    res.cookie("accessToken", 'expired');
    res.cookie("refreshToken", 'bye');
    res.status(200).json({ message: 'signout success' });
  }
}