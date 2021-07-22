const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const port = 80;

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

console.log("테스트 용도로 추가했습니다.")
// 각종 라우팅 설정하기

app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});


app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
