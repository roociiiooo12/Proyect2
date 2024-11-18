const router = require('express').Router()

router.use('./appointments.router', require('./appointments.router'))
router.use('./doctors.router', require('./doctors.router'))
router.use('./medications.router', require('./medications.router'))
router.use('./patients.router', require('./patients.router'))
router.use('./prescriptions.router', require('./prescriptions.router'))

module.exports = router