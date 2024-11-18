const router = require('express').Router()

const { getAllDoctors, getOneDoctor, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors')

router.get('/', getAllDoctors)
router.get('/:id', getOneDoctor)
router.post('/', createDoctor)
router.put('/:id', updateDoctor)
router.delete('/:id', deleteDoctor)

module.exports = router








