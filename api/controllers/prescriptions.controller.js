const Prescriptions = require("../models/prescriptions.model");

const getAllPrescriptions = async (request, response) => {
    try {
        const prescription = await Prescriptions.findAll();
        return response.status(200).json(prescription);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const getOnePrescription = async (request, response) => {
    try {
        const prescription = await Prescriptions.findOne({
            where: {
                id: request.params.id,
            },
        });
        return response.status(200).json(prescription);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const createPrescription = async (request, response) => {
    try {
        const prescription = await Prescriptions.create(request.body);
        return response.status(200).json(prescription);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const updatePrescription = async (request, response) => {
    try {
        const prescription = await Prescriptions.update(request.body, {
            where: {
                id: request.params.id,
            },
        });
        return response.status(200).json(prescription);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const deletePrescription = async (request, response) => {
    try {
        await Prescriptions.destroy({
            where: {
                id: request.params.id,
            },
        });
        return response
            .status(200)
            .send(`Prescription
     with id ${request.params.id} was deleted`);
    } catch (error) {
        return response.status(501).send(error);
    }
};
module.exports = {
    getAllPrescriptions,
    getOnePrescription,
    createPrescription,
    updatePrescription,
    deletePrescription,
}