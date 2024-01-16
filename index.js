const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");

const { User } = require("./models/User");
const cors = require("cors");

// 업뎃돼서 해줄 필요가 없어짐.
// body parser는 express에 포함돼서 할 필요 없게 됨.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
