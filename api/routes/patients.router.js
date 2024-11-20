const router = require('express').Router()

const { getAllPatients, getOnePatient, createPatient, updatePatient, deletePatient, getPatientPrescriptions, getPatientAppointments, createAppointment, deleteAppointment } = require('../controllers/patients.controller')

const { checkAuth, checkDoctor, checkAdmin } = require("../middleware/auth");

router.get('/', checkAuth, checkAdmin, getAllPatients)
router.get('/:id', checkAuth, checkAdmin, getOnePatient)
router.post('/', checkAuth,  checkAdmin,  createPatient)
router.put('/:id', checkAuth,  checkAdmin, updatePatient)
router.delete('/:id', checkAuth, checkAdmin, deletePatient)
router.get('/:id/prescriptions', checkAuth, checkDoctor, getPatientPrescriptions)
router.get('/:id/appointments', checkAuth, checkDoctor, getPatientAppointments)
router.post('/:id/appointments', checkAuth, createAppointment)
router.delete('/:pacienteID/appointments/:citaID', checkAuth, checkDoctor, deleteAppointment);

//EN este doc, poner las funciones de autenticacion de patient

module.exports = router;

