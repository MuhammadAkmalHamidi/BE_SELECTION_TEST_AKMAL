require("dotenv").config();
const express = require("express");
const PORT = 2000;
const db = require("./models");
const {
  userRouter,
  absenRouter,
  salaryRouter,
  jadwalRouter,
} = require("./routers");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors())

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/absen", absenRouter);
app.use("/salary", salaryRouter);
app.use("/jadwal", jadwalRouter);
app.use(express.static("./public"));

app.listen(PORT, () => {
  // db.sequelize.sync({alter : true})
  console.log(`server is running at port : ${PORT}`);
});
