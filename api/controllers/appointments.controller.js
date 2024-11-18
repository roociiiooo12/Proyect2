const Appointments = require("../models/appointments.model");

const getAllAppointments = async (request, response) => {
    try {
        const appointment = await Appointment.findAll(); 
        return response.status(200).json(appointment); 
    } catch (error) {
        return response.status(501).send(error); 
    }
};

const getOneAppointment = async (request, response) => {
    try {
        const appointment = await Appointment.findOne({
            where: {
                id: request.params.id, 
            },
        });
        return response.status(200).json(appointment);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const createAppointment = async (request, response) => {
    try {
        const appointment = await Appointment.create(request.body); 
        return response.status(200).json(appointment);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const updateAppointment = async (request, response) => {
    try {
        const appointment = await Appointment.update(request.body, {
            where: {
                id: request.params.id,
            },
        });
        return response.status(200).json(appointment);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const deleteAppointment = async (request, response) => {
    try {
        await Appointment.destroy({
            where: {
                id: request.params.id, 
            },
        });
        return response
            .status(200)
            .send(`Appointment with id ${request.params.id} was deleted`); 
    } catch (error) {
        return response.status(501).send(error);
    }
};
const addPacienteToCita = async (request, response) => {
    try {
        const citaId = request.params.id;
        const pacienteId = request.params.pacienteId

        const appointment = await Appointment.findByPk(citaId);

        if (!appointment) {
            return response.status(404).json({ error: "Appointment not found" });
        }
        const paciente = await Paciente.findOne({
            where: {
                id: request.params.pacienteId,
            },
        });
        await citaaddPaciente(paciente);

        return response.status(200).json({ message: "Paciente added to Appointment", paciente });
    } catch (error) {
        return response.status(500).send(error);
    }
};

module.exports = {
    getAllAppointments,
    getOneAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
}