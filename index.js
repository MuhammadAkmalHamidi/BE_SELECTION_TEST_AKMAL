require('dotenv').config()
const express = require('express')
const PORT = 3307
const db = require('./models')
const { userRouter, absenRouter, salaryRouter, jadwalRouter } = require('./routers')

const app = (express())
app.use(express.json())

app.use('/user', userRouter)
app.use('/absen', absenRouter)
app.use('/salary', salaryRouter)
app.use('/jadwal', jadwalRouter)
app.use(express.static('./public'))

app.listen(PORT, () => {
    // db.sequelize.sync({alter : true})
    console.log(`server is running at port : ${PORT}`);
})