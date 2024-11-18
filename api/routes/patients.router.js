const router = require('express').Router()

const { getAllPatients, getOnePatient, createPatient, updatePatient, deletePatient } = require('../controllers/patients')

router.get('/', getAllPatients)
router.get('/:id', getOnePatient)
router.post('/', createPatient)
router.put('/:id', updatePatient)
router.delete('/:id', deletePatient)

module.exports = router

