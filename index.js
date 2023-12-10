require('dotenv').config();
const express = require('express');
const PORT = 3600;
const db = require('./models');
const { userRouter, absenRouter, salaryRouter, jadwalRouter } = require('./routers');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cors({ origin: 'https://appsensi-nine.vercel.app' }));

app.use(express.json());

app.use('/user', userRouter);
app.use('/absen', absenRouter);
app.use('/salary', salaryRouter);
app.use('/jadwal', jadwalRouter);
app.use(express.static('./public'));

app.listen(PORT, () => {
    // db.sequelize.sync({alter : true})
    console.log(`server is running at port : ${PORT}`);
});
