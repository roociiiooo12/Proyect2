const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Patients = require("../models/patients.model")
const Doctors = require("../models/doctors.model")


const signupPatient = async (req, res) => {
    try {
        const saltRounds = bcrypt.genSaltSync(parseInt(process.env.NUMBER)); //esto en .env
        const hasedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        req.body.password = hasedPassword;

        const user = await Patients.create(req.body);
        if (user) {
            const patient = await Patients.findOne({ where: { email: req.body.email } });
            const payload = { email: req.body.email, role: patient.role };
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
            res.status(200).json({ token, role: user.role, user: user.email });
        }

    } catch (error) {
        return res.status(500).send(error);
    }
};
//en este doc, poner los login y logout de doctor y patient


const loginPatient = async (req, res) => {
    try {
        const user = await Patients.findOne({
            where: { email: req.body.email },
        });

        if (!user) return res.status(400).send("Error: user not found");

        const comparePass = bcrypt.compareSync(req.body.password, user.password);

        if (comparePass) {
            const payload = { email: user.email, role: user.role };
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
            return res.status(200).json({ token, role: user.role });
        } else {
            return res.status(404).send("Error: campos incorrectos");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

const signupDoctor = async (req, res) => {
    try {
        const saltRounds = bcrypt.genSaltSync(parseInt(process.env.NUMBER)); //esto en .env
        const hasedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        req.body.password = hasedPassword;

        const user = await Doctors.create(req.body);
        if (user) {
            const doctor = await Doctors.findOne({ where: { email: req.body.email } });
            const payload = { email: req.body.email, role: doctor.role };
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
            res.status(200).json({ token, role: user.role, user: user.email });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};



const loginDoctor = async (req, res) => {
    try {
        const user = await Doctors.findOne({
            where: { email: req.body.email },
        });

        if (!user) return res.status(400).send("Error: user not found");

        const comparePass = bcrypt.compareSync(req.body.password, user.password);

        if (comparePass) {
            const payload = { email: user.email, role: user.role };
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
            return res.status(200).json({ token, role: user.role });
        } else {
            return res.status(404).send("Error: pa tu casa");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};


const logout = async (req, res) => {
    try {
        res.locals.user = ""
        jwt.destroy(req.headers.authorization)
    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports = { signupPatient, loginPatient, signupDoctor, loginDoctor, logout };
