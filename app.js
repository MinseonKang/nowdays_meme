// express 불러오기
const express = require("express");

// express 실행
const app = express();

// PORT NUMBER
const PORT = 8000;

// app에 view engine을 ejs로 설정
app.set("view engine", "ejs");
// ejs 파일을 저장할 views, static 폴더의 경로
app.use("/views", express.static(__dirname + "/view"));
app.use("/static", express.static(__dirname + "/static"));

// Routing (라우팅)
app.get("/", function (req, res) {
  res.render("start");
});

app.get("/header", function (req, res) {
  res.render("header");
});

app.get("/index", function (req, res) {
  res.render("index");
});

// 3. 로컬 서버 동작
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
