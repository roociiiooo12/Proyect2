const router = require('express').Router()

const { getAllDoctors, getOneDoctor, createDoctor, 
    updateDoctor, deleteDoctor, getDoctorAppointments, getOnePatient, createPatientByDoctor, createPrescriptionByDoctor, getPatientPrescriptionsByDoctor } = require('../controllers/doctors.controller')

router.get('/', getAllDoctors)
router.get('/:id', getOneDoctor)
router.post('/', createDoctor)
router.put('/:id', updateDoctor)
router.delete('/:id', deleteDoctor)
router.get('/:medicoID/appointments', getDoctorAppointments)
router.get('/:medicoID/patients/:pacienteID', getOnePatient)
router.post('/:medicoID/patients', createPatientByDoctor)
router.post('/:medicoID/patients/:pacienteID/prescriptions', createPrescriptionByDoctor);
router.get('/:medicoID/patients/:pacienteID/prescriptions', getPatientPrescriptionsByDoctor);


module.exports = router








