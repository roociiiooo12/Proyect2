const router = require('express').Router()


const authRouter = require("./auth.router");

router.use('/appointments', require('./appointments.router'))
router.use('/doctors', require('./doctors.router'))
router.use('/medications', require('./medications.router'))
router.use('/patients', require('./patients.router'))
router.use('/prescriptions', require('./prescriptions.router'))

router.use("/auth", authRouter);

module.exports = router