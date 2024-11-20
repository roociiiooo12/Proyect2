const jwt = require("jsonwebtoken");
const Patients = require("../models/patients.model");
const Doctors = require("../models/doctors.model");



const checkAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(404).send("Token not found");
        }

        jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
            if (err) return res.status(401).send("Token not valid");
            if(result.role === "Doctor"){
            const user = await Doctors.findOne({
                where: { email: result.email },
            });
            if (!user) return res.status(404).send("Doctor not found");
                res.locals.user = user;

            } 
            if (result.role === "Patient") {
                const user = await Patients.findOne({
                    where: { email: result.email },
                });
                if (!user) return res.status(404).send("Patient not found");
                res.locals.user = user;
            } 
   
            next();
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const checkAdmin = async (req, res, next) => {
    try {
        if (res.locals.user.role !== "Admin") {
            return res.status(401).send("You're not an admin");
        } else {
            next();
        }
    } catch (error) {
        res.status(404).send(error);
    }
};

const checkDoctor = async (req, res, next) => {
    try {
        if (res.locals.user.role !== "Doctor" && res.locals.user.role !== "Admin")  {
            return res.status(401).send("You're not a doctor");
        } else {
            next();
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
};



module.exports = { checkAuth, checkAdmin, checkDoctor };
