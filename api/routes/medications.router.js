const router = require('express').Router()

const { getAllMedications, getOneMedication, createMedication,  updateMedication, deleteMedication } = require('../controllers/medications.controller')

router.get('/', getAllMedications)
router.get('/:id', getOneMedication)
router.post('/', createMedication)
router.put('/:id',  updateMedication)
router.delete('/:id', deleteMedication)

module.exports = router

