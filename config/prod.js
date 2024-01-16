// Heroku와 같은 프로덕션에 저장된 변수 사용
module.exports = {
    mongoURI: process.env.MONGO_URI
  };