const router = require('express').Router()

const { getAllDoctors, getOneDoctor, createDoctor, 
    updateDoctor, deleteDoctor, getDoctorAppointments, getOnePatient, createPatientByDoctor, createPrescriptionByDoctor, getPatientPrescriptionsByDoctor } = require('../controllers/doctors.controller')

const { checkAuth, checkDoctor, checkAdmin } = require("../middleware/auth");

router.get('/', checkAuth, checkAdmin, getAllDoctors)
router.get('/:medicoID/appointments', checkAuth, checkDoctor, getDoctorAppointments)
router.get('/:id', checkAuth, checkAdmin, getOneDoctor)
router.post('/', checkAuth, checkAdmin, createDoctor)
router.put('/:id', checkAuth, checkAdmin, updateDoctor)
router.delete('/:id', checkAuth, checkAdmin, deleteDoctor)
router.get('/:medicoID/patients/:pacienteID', checkAuth, checkDoctor, getOnePatient)
router.post('/:medicoID/patients', checkAuth, checkDoctor, createPatientByDoctor)
router.post('/:medicoID/patients/:pacienteID/prescriptions', checkAuth, checkDoctor, createPrescriptionByDoctor);
router.get('/:medicoID/patients/:pacienteID/prescriptions', checkAuth, checkDoctor, getPatientPrescriptionsByDoctor);

//en este DOC poner las funciones de autenticacion de doctor

module.exports = router








