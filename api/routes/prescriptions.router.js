const router = require('express').Router()

const { getAllPrescriptions, getOnePrescription, createPrescription, updatePrescription, deletePrescription } = require('../controllers/prescriptions')

router.get('/', getAllPrescriptions)
router.get('/:id', getOnePrescription)
router.post('/', createPrescription)
router.put('/:id', updatePrescription)
router.delete('/:id', deletePrescription)

module.exports = router
