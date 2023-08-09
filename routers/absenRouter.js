const {absenController} = require('../controllers')
const salary = require('../controllers/salaryController')
const { verifyToken } = require('../middleware/auth')

const router = require('express').Router()

router.post('/clockIn', verifyToken,absenController.clockIn)
router.post('/clockOut', verifyToken,absenController.clockOut)
router.get('/history', verifyToken, absenController.riwayatAbsen)


module.exports = router