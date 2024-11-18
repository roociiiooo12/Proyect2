const router = require('express').Router()

router.use('/appointments', require('./appointments.router'))
router.use('/doctors', require('./doctors.router'))
router.use('/medications', require('./medications.router'))
router.use('/patients', require('./patients.router'))
router.use('/prescriptions', require('./prescriptions.router'))

module.exports = router