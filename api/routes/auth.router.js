const router = require("express").Router();

const { loginPatient, signupPatient, loginDoctor, signupDoctor} = require("../controllers/auth.controller");

router.post("/loginPatient", loginPatient);
router.post("/signupPatient", signupPatient);

router.post("/loginDoctor", loginDoctor);
router.post("/signupDoctor", signupDoctor); 

// hay que cambiar la ruta con la que se accede a las funciones de doctor en este documento?

module.exports = router;
