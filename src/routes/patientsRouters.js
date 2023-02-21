// ------------REQUERIMIENTOS-----------------------
const express = require("express");
const router = express.Router();
const patientsControllers = require("../controllers/patientsControllers");
const path = require("path");
const { string } = require("i/lib/util");
//----------------RUTAS------------------------------------

/***Home***/
router.get("/", patientsControllers.index);

/***Register page***/
router.get("/register",patientsControllers.register);

/*** Create Patient***/
router.post("/register", patientsControllers.createPatient);

/*** Search a Patient***/
router.post("/", patientsControllers.searchPatient);

/***Delete Patient ***/
router.delete("/:id", patientsControllers.deletePatient);

/*** Edit Info Patient***/
// router.put("/updateInfo/:id", patientsControllers.updateInfoPatient);


//-----------EXPORTAR MODULO---------------------------
module.exports = router;
