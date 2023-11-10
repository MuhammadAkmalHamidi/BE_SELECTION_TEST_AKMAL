const { jadwalController } = require('../controllers')
const { verifyToken } = require('../middleware/auth')

const router = require('express').Router()

router.get('/',jadwalController.getAllJadwal)
router.get('/check', verifyToken,jadwalController.cekShift)
router.delete('/delete/:userId', jadwalController.deleteShift)
router.post('/add/:userId/:shiftId', jadwalController.addShiftUser)


module.exports = router