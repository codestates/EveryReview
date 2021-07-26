const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { signup, signin, signout, auth, post, postlist, selectbook, like } = require('./controllers');

const app = express();
const port = 80;

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// 각종 라우팅 설정하기

// app.post('/signup', controllers.signup);
app.get('/', (req, res) => {
  res.send("hello world");
});

app.post('/signin', signin);
app.post('/signup', signup);
app.get('/auth', auth);
app.post('/post', post);
app.post('/selectbook', selectbook);
app.get('/postlist', postlist);


app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
