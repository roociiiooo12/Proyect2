const Patients = require("../models/patients.model");
const Prescriptions = require ("../models/prescriptions.model")
const Appointments = require ("../models/appointments.model.js")

const getAllPatients = async (request, response) => {
    try {
        const patient = await Patients.findAll();
        return response.status(200).json(patient);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const getOnePatient = async (request, response) => {
    try {
        const patient = await Patients.findOne({
            where: {
                id: request.params.id,
            },
        });
        return response.status(200).json(patient);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const createPatient = async (request, response) => {
    try {
        const patient = await Patients.create(request.body);
        return response.status(200).json(patient);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const updatePatient = async (request, response) => {
    try {
        const patient = await Patients.update(request.body, {
            where: {
                id: request.params.id,
            },
        });
        return response.status(200).json(patient);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const deletePatient = async (request, response) => {
    try {
        await Patients.destroy({
            where: {
                id: request.params.id,
            },
        });
        return response
            .status(200)
            .send(`Patient
     with id ${request.params.id} was deleted`);
    } catch (error) {
        return response.status(501).send(error);
    }
};

//Funciones adicionales
// Función para obtener las recetas de un paciente por su ID (función exclusiva de paciente)

const getPatientPrescriptions = async (req, res) => {
    try {
        const { id } = req.params; 
        
        const patient = await Patients.findOne({
            where: { id }, 
            include: [
                {
                    model: Prescriptions,
                    as: "PatientsToPrescriptions",
                    attributes: ['pacienteID', 'nombre', 'descripcion', 'fecha'], 
                },
            ],
        });
        
        if (!patient) {
            return res.status(404).json({ message: 'Paciente no encontrado.' });
        }

        if (patient.PatientsToPrescriptions.length === 0) {
            return res.status(200).json({ message: 'El paciente no tiene recetas asociadas.', recetas: [] });
        }

        res.status(200).json({
            message: `Recetas del paciente ${patient.nombre} ${patient.apellidos}`,
            recetas: patient.PatientsToPrescriptions,
        });
    } catch (error) {
        
        console.error('Error al obtener las recetas del paciente:', error);
        res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo de nuevo.' });
    }
};



// Función para obtener las CITAS de un paciente por su ID (función exclusiva de paciente)

const getPatientAppointments = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patients.findOne({
            where: { id },
            include: [
                {
                    model: Appointments,
                    as: "PatientsToAppointments",
                    attributes: ['pacienteID', 'medicoID', 'fecha', 'hora', 'motivo', 'estado'],
                },
            ],
        });

        if (!patient) {
            return res.status(404).json({ message: 'Paciente no encontrado.' });
        }

        if (patient.PatientsToAppointments.length === 0) {
            return res.status(200).json({ message: 'El paciente no tiene citas asociadas.', citas: [] });
        }

        res.status(200).json({
            message: `Citas del paciente ${patient.nombre} ${patient.apellidos}`,
            citas: patient.PatientsToAppointments,
        });
    } catch (error) {

        console.error('Error al obtener las citas del paciente:', error);
        res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo de nuevo.' });
    }
};

//Función para que paciente pueda crear cita 

const createAppointment = async (req, res) => {
    try {
        const { id } = req.params; 
        const { medicoID, fecha, hora, motivo } = req.body;

        // Verificar si el paciente existe
        const patient = await Patients.findOne({ where: { id } });

        if (!patient) {
            return res.status(404).json({ message: 'Paciente no encontrado.' });
        }

        if (!fecha) {
            return res.status(400).json({ message: 'El campo fecha es obligatorio.' });
        }
        if (!hora) {
            return res.status(400).json({ message: 'El campo hora es obligatorio.' });
        }
        if (!motivo) {
            return res.status(400).json({ message: 'El campo motivo es obligatorio.' });
        }

        // Crear un nuevo registro directamente en la tabla appointments
        const newAppointment = await Appointments.create({
            pacienteID: id, // Asociamos la cita con el paciente
            medicoID: medicoID,
            "fecha": fecha,   
            "hora": hora,
            "motivo": motivo,
            estado: 'Programada', // Estado inicial de la cita
        });
        console.log(req.body)
        // Respuesta de éxito
        return res.status(201).json({
            message: "Cita creada exitosamente",
            cita: newAppointment
        });
    } catch (error) {
        console.error('Error al crear la cita:', error.message);
        return res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo nuevamente.' });
    }
};


//Función para que paciente pueda CANCELAR cita 

const deleteAppointment = async (req, res) => {
    try {
        const { pacienteID, citaID } = req.params; // Obtener tanto el pacienteID como el citaID de la URL

        // Verificar si el paciente existe
        const patient = await Patients.findOne({ where: { pacienteID } });

        if (!patient) {
            return res.status(404).json({ message: 'Paciente no encontrado.' });
        }

        // Buscar la cita específica de ese paciente
        const appointment = await Appointments.findOne({
            where: {
                citaID: citaID,
                pacienteID: pacienteID, // Asegúrate de que la cita pertenezca al paciente
            }
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada o no pertenece a este paciente.' });
        }

        // Eliminar la cita
        await appointment.destroy();

        // Respuesta de éxito
        return res.status(200).json({ message: 'Cita eliminada exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar la cita:', error.message);
        return res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo nuevamente.' });
    }
};


module.exports = {
    getAllPatients,
    getOnePatient,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientPrescriptions,
    getPatientAppointments,
    createAppointment,
    deleteAppointment
}