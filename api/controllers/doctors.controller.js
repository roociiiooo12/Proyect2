const Doctors = require("../models/doctors.model");
const Appointments = require("../models/appointments.model")
const Patients = require("../models/patients.model")
const Prescriptions = require("../models/prescriptions.model")

const getAllDoctors = async (request, response) => {
    try {
        const doctor = await Doctors.findAll();
        return response.status(200).json(doctor);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const getOneDoctor = async (request, response) => {
    try {
        const doctor = await Doctors.findOne({
            where: {
                id: request.params.id,
            },
        });
        return response.status(200).json(doctor);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const createDoctor = async (request, response) => {
    try {
        const doctor = await Doctors.create(request.body);
        return response.status(200).json(doctor);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const updateDoctor = async (request, response) => {
    try {
        const doctor = await Doctors.update(request.body, {
            where: {
                id: request.params.id,
            },
        });
        return response.status(200).json(doctor);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const deleteDoctor = async (request, response) => {
    try {
        await Doctors.destroy({
            where: {
                id: request.params.id,
            },
        });
        return response
            .status(200)
            .send(`Doctor
     with id ${request.params.id} was deleted`);
    } catch (error) {
        return response.status(501).send(error);
    }
};


// función para traer todas las CITAS de 1 doctor

const getDoctorAppointments = async (req, res) => {
    try {
        const { medicoID } = req.params;

        const doctor = await Doctors.findOne({
            where: { medicoID },
            include: [
                {
                    model: Appointments,
                    as: "DoctorsToAppointments",
                    attributes: ['pacienteID', 'medicoID', 'fecha', 'hora', 'motivo', 'estado'],
                },
            ],
        });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado.' });
        }

        if (doctor.DoctorsToAppointments.length === 0) {
            return res.status(200).json({ message: 'El doctor no tiene citas asociadas.', citas: [] });
        }

        res.status(200).json({
            message: `Citas del doctor ${doctor.nombre} ${doctor.apellidos}`,
            citas: doctor.DoctorsToAppointments,
        });
    } catch (error) {

        console.error('Error al obtener las citas del doctor:', error);
        res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo de nuevo.' });
    }
};


// Función para traer todos los PACIENTES de 1 doctor

const getDoctorPatients = async (req, res) => {
    try {
        const { medicoID } = req.params;

        const doctor = await Doctors.findOne({
            where: { medicoID },

            include:
            {
                model: Appointments,
                as: "DoctorsToAppointments",
                attributes: ['pacienteID'],

                include: {
                    model: Patients,
                    as: "PatientsToAppointments",

                }

            },
        });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado.' });
        }

        if (doctor.DoctorsToAppointments.length === 0) {
            return res.status(200).json({ message: 'El doctor no tiene citas asociadas.', citas: [] });
        }

        res.status(200).json({
            message: `Citas del doctor ${doctor.nombre} ${doctor.apellidos}`,
            citas: doctor.DoctorsToAppointments,
        });
    } catch (error) {

        console.error('Error al obtener las citas del doctor:', error);
        res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo de nuevo.' });
    }
};

// SELECCIONAR a un PACIENTE de 1 doctor 

const getOnePatient = async (req, res) => {
    try {
        const { medicoID, pacienteID } = req.params; // Obtenemos el ID del doctor y del paciente desde los parámetros

        // Verificar si el doctor existe
        const doctor = await Doctors.findOne({
            where: { medicoID }
        });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado.' });
        }

        // Buscar la cita que conecta al doctor con el paciente
        const appointment = await Appointments.findOne({
            where: {
                medicoID,
                pacienteID
            },
            include: {
                model: Patients,
                as: "PatientsToAppointments", // Alias definido en las asociaciones
                attributes: ['pacienteID', 'nombre', 'apellidos', 'telefono', 'poblacion'], // Campos que queremos del paciente
            }
        });

        if (!appointment) {
            return res.status(404).json({ message: 'No se encontró un paciente relacionado con este doctor.' });
        }

        // Responder con los datos del paciente encontrado
        res.status(200).json({
            message: `Paciente relacionado con el doctor ${doctor.nombre} ${doctor.apellidos}`,
            paciente: appointment.PatientsToAppointments,
        });
    } catch (error) {
        console.error('Error al obtener el paciente del doctor:', error);
        res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo de nuevo.' });
    }
};


//FUNCION para el doctor cree un PACIENTE NUEVO.



const createPatientByDoctor = async (req, res) => {
    try {
        const { medicoID } = req.params; // ID del doctor
        const { nombre, apellidos, telefono, poblacion } = req.body; // Datos del paciente

        // Verificar si el doctor existe
        const doctor = await Doctors.findOne({ where: { medicoID: medicoID } });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado.' });
        }

        // Validar los datos del paciente
        if (!nombre || !apellidos || !telefono || !poblacion) {
            return res.status(400).json({
                message: 'Todos los campos (nombre, apellidos, teléfono y población) son obligatorios.'
            });
        }

        // Crear el nuevo paciente
        const newPatient = await Patients.create({
            nombre,
            apellidos,
            telefono,
            poblacion
        });

        // Respuesta de éxito
        return res.status(201).json({
            message: 'Paciente creado exitosamente.',
            paciente: newPatient
        });
    } catch (error) {
        console.error('Error al crear el paciente:', error.message);
        return res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo nuevamente.' });
    }
};



//FUNCION para que el doctor cree un NUEVA RECETA A UN PACIENTE



const createPrescriptionByDoctor = async (req, res) => {
    try {
        const { medicoID, pacienteID } = req.params; // ID del doctor y del paciente
        const {nombre, descripcion, fecha} = req.body; // Datos de la receta

        // Verificar si el doctor existe
        const doctor = await Doctors.findOne({ where: { medicoID: medicoID } });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado.' });
        }

        // Verificar si el paciente existe y está asociado al doctor mediante una cita
        const appointment = await Appointments.findOne({
            where: { medicoID, pacienteID }
        });

        if (!appointment) {
            return res.status(404).json({ message: 'El paciente no está asociado al doctor.' });
        }

        // Validar los datos de la receta
        if (!nombre || !descripcion || !fecha) {
            return res.status(400).json({
                message: 'Todos los campos (nombre, descripcion, fecha) son obligatorios.'
            });
        }

        // Crear la nueva receta
        const newPrescription = await Prescriptions.create({
            medicoID,
            pacienteID,
            nombre,
            descripcion,
            fecha
        });

        // Respuesta de éxito
        return res.status(201).json({
            message: 'Receta creada exitosamente.',
            receta: newPrescription
        });
    } catch (error) {
        console.error('Error al crear la receta:', error.message);
        return res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo nuevamente.' });
    }
};


// función para que doctor vea TODAS LAS RECETAS de un MISMO PACIENTE


const getPatientPrescriptionsByDoctor = async (req, res) => {
    try {
        const { medicoID, pacienteID } = req.params; // IDs del doctor y paciente

        // Verificar si el doctor existe
        const doctor = await Doctors.findOne({ where: { medicoID: medicoID } });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado.' });
        }

        // Verificar si el paciente está asociado al doctor mediante una cita
        const appointment = await Appointments.findOne({
            where: { medicoID, pacienteID }
        });

        if (!appointment) {
            return res.status(404).json({ message: 'El paciente no está asociado al doctor.' });
        }

        // Obtener las recetas asociadas al paciente
        const prescriptions = await Prescriptions.findAll({
            where: { pacienteID },
            attributes: ['nombre', 'descripcion', 'fecha',], // Campos relevantes
           
        });

        if (prescriptions.length === 0) {
            return res.status(200).json({ message: 'El paciente no tiene recetas asociadas.', recetas: [] });
        }

        // Respuesta de éxito
        res.status(200).json({
            message: `Recetas del paciente con ID ${pacienteID} asociadas al doctor ${doctor.nombre} ${doctor.apellidos}.`,
            recetas: prescriptions
        });
    } catch (error) {
        console.error('Error al obtener las recetas del paciente:', error.message);
        res.status(500).json({ message: 'Error del servidor. Por favor, inténtalo de nuevo.' });
    }
};





module.exports = {
    getAllDoctors,
    getOneDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorAppointments,
    getDoctorPatients,
    getOnePatient,
    createPatientByDoctor,
    createPrescriptionByDoctor,
    getPatientPrescriptionsByDoctor

}