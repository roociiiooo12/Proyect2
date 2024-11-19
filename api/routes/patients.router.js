const router = require('express').Router()

const { getAllPatients, getOnePatient, createPatient, updatePatient, deletePatient, getPatientPrescriptions, getPatientAppointments, createAppointment } = require('../controllers/patients.controller')

router.get('/', getAllPatients)
router.get('/:id', getOnePatient)
router.post('/', createPatient)
router.put('/:id', updatePatient)
router.delete('/:id', deletePatient)
router.get('/:id/prescriptions', getPatientPrescriptions)
router.get('/:id/appointments', getPatientAppointments);
router.post('/:id/appointments', createAppointment)

module.exports = router;

