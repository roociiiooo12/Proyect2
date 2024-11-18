const Patients = require("../models/medications.model");

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
            .send(`Patients
     with id ${request.params.id} was deleted`);
    } catch (error) {
        return response.status(501).send(error);
    }
};
module.exports = {
    getAllPatients,
    getOnePatient,
    createPatient,
    updatePatient,
    deletePatient,
}