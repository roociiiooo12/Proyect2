const Appointments = require("../models/appointments.model");

const getAllAppointments = async (request, response) => {
    try {
        const appointment = await Appointments.findAll(); 
        return response.status(200).json(appointment); 
    } catch (error) {
        return response.status(501).send(error); 
    }
};

const getOneAppointment = async (request, response) => {
    try {
        const appointment = await Appointments.findOne({
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
        const appointment = await Appointments.create(request.body); 
        return response.status(200).json(appointment);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const updateAppointment = async (request, response) => {
    try {
        const appointment = await Appointments.update(request.body, {
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
        await Appointments.destroy({
            where: {
                id: request.params.id, 
            },
        });
        return response
            .status(200)
            .send(`Appointments with id ${request.params.id} was deleted`); 
    } catch (error) {
        return response.status(501).send(error);
    }
};
module.exports = {
    getAllAppointments,
    getOneAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
}