const Doctors = require("../models/doctors.model");

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
module.exports = {
    getAllDoctors,
    getOneDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}