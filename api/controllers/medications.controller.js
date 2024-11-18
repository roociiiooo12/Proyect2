const Medications = require("../models/medications.model");

const getAllMedications = async (request, response) => {
    try {
        const medication = await Medications.findAll();
        return response.status(200).json(medication);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const getOneMedication = async (request, response) => {
    try {
        const medication = await Medications.findOne({
            where: {
                id: request.params.id,
            },
        });
        return response.status(200).json(medication);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const createMedication = async (request, response) => {
    try {
        const medication = await Medications.create(request.body);
        return response.status(200).json(medication);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const updateMedication = async (request, response) => {
    try {
        const medication = await Medications.update(request.body, {
            where: {
                id: request.params.id,
            },
        });
        return response.status(200).json(medication);
    } catch (error) {
        return response.status(501).send(error);
    }
};

const deleteMedication = async (request, response) => {
    try {
        await Medications.destroy({
            where: {
                id: request.params.id,
            },
        });
        return response
            .status(200)
            .send(`Medication
     with id ${request.params.id} was deleted`);
    } catch (error) {
        return response.status(501).send(error);
    }
};
module.exports = {
    getAllMedications,
    getOneMedication,
    createMedication,
    updateMedication,
    deleteMedication,
}