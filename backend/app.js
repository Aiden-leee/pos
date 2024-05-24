const express = require("express");
const app = express();
const tableRouter = require("./routes/tables");
const menuRouter = require("./routes/menu");
const salesRouter = require("./routes/sales");
const PORT = 4000;

// body-parser 사용하지 않음 express 4.16 이상인 경우 내장설치되어있기때문에 사용
// extended true ,express 내장 querystring 모듈 사용
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// respond with "hello world" when a GET request is made to the homepage
// app.get("/", function (req, res) {
//   res.send("hello world");
// });
app.use("/menu", menuRouter);
app.use("/tables", tableRouter);
app.use("/sales", salesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
