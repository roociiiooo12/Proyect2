const Appointments = require('../api/models/appointments.model')
const Doctors = require('../api/models/doctors.model')
const Medications = require('../api/models/medications.model')
const Patients = require('../api/models/patients.model')
const Prescriptions = require('../api/models/prescriptions.model')


function addRelationsToModels() {
    try {
        Doctors.hasMany(Appointments, {
            foreignKey: 'medicoID',
            as: 'DoctorsToAppointments'
        });
        Appointments.belongsTo(Doctors, {
            foreignKey: 'medicoID',
            as: 'DoctorsToAppointments'
        });


        Patients.hasMany(Appointments, {
            foreignKey: 'pacienteID',
            as: 'PatientsToAppointments'
        });

        Appointments.belongsTo(Patients, {
            foreignKey: 'pacienteID',
            as: 'PatientsToAppointments'
        });

        Patients.hasOne(Prescriptions, {
            foreignKey: 'pacienteID',
            as: 'PatientsToPrescriptions'
        });

        Prescriptions.belongsTo(Patients, {
            foreignKey: 'pacienteID',
            as: 'PatientsToPrescriptions'
        });

        Medications.hasOne(Prescriptions, {
            through: 'patient_medications',
            as: 'MedicationsToPrescriptions',
            foreignKey: 'pacienteID',
        });

        Prescriptions.belongsTo(Medications, {
            through: 'patient_medications',
            as: 'MedicationsToPrescriptions',
            foreignKey: 'pacienteID',
        });
        console.log('Relations added to all models')
    } catch (error) {
        throw error
    }
} 

module.exports = addRelationsToModels