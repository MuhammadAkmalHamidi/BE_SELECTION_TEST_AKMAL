const { salaryController } = require('../controllers')
const { verifyToken } = require('../middleware/auth')

const router = require('express').Router()

router.post('/monthSalary', verifyToken, salaryController.monthSalary)

module.exports = router