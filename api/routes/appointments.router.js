const router = require('express').Router()

const { getAllAppointments, getOneAppointment, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointments.controller')

router.get('/', getAllAppointments)
router.get('/:id', getOneAppointment)
router.post('/', createAppointment)
router.put('/:id', updateAppointment)
router.delete('/:id', deleteAppointment)

module.exports = router

