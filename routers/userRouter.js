const { userController } = require('../controllers')
const { verifyToken } = require('../middleware/auth')
const { checkRegister } = require('../middleware/validator')

const router = require('express').Router()

router.post('/register',checkRegister, userController.addEmployee)
router.post('/createAccount', userController.sendMail )
router.post('/login', userController.login)
router.get('/keepLogin', verifyToken, userController.keepLogin)
router.get('/', userController.allEmploye)
router.post('/addSalary', userController.addSalary)

module.exports = router