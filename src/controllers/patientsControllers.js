//-----------------REQUERIMIENTOS-------------------------
const fs = require("fs");
const path = require("path");
//----------------IMPORTO MODELOS----------------------------------------
const db = require("../database/models");
//------------OBJETO DEL CONTROLADOR------------------
const controllerPatients = 
{
  //------------MOSTRAR PAGINA PRINCIPAL---------------
  index: (req, res) => { 
    res.render("home")
  },

  register: (req, res) => {
    res.render("register")
  },

  createPatient: (req, res) => {
    db.Patients.findOne({ where: { dni: req.body.dni} }).then(function (patient)
    {
      if (patient) {
        return res.render("register", {existe: true});
      } else {
        let newPatient = {
            name: req.body.name,
            typeDNI: req.body.typeDNI,
            dni: req.body.dni,
            dateBirth:req.body.dateBirth,
            weight: req.body.weight,
            height: req.body.height,
          }
          db.Patients.create(newPatient).then(function (patient) {
            return res.render('register',{existe: false})
          });
      }
    });
  },

  searchPatient: (req, res) => {
    db.Patients.findOne({ where: { dni: req.body.dni }}).then(function (patient) {
        /* Se envia un mensaje de error*/
        if (!patient) {
          return res.render("home",{existe: true})}
        /* Si se encuentra el usuario*/
        if (patient.typeDNI == req.body.typeDNI) {
            let today = new Date()
            let dateBirth = new Date(patient.dateBirth)
            let age = today.getFullYear() - dateBirth.getFullYear()
            let diferenceMonth = today.getMonth() - dateBirth.getMonth()
            if (diferenceMonth < 0 || (diferenceMonth === 0 && today.getDate() < dateBirth.getDate()))
            {
                age--
            }
            res.render("data", {patient : patient, age: age})
          } else { 
          return res.render("home",{existe: true});} /* Se envia un mensaje de error por credenciales incorrectas */
      });
  },

  deletePatient: (req, res) => {
      db.Patients.destroy({ where: { id: req.params.id } }).then(function (){
        return res.render("home")
      })
  },
  editInfoPatient: (req,res) =>{
    let patient = db.Patients.findOne({where: {id: req.params.id}}).then(function(patient){
      return res.render("dataEdit", {patient:patient});
    })
  },

  updateInfoPatient: async (req,res) =>{
    let newData = {
      name: req.body.name,
      typeDNI: req.body.typeDNI,
      dni: req.body.dni,
      dateBirth:req.body.dateBirth,
      weight: req.body.weight,
      height: req.body.height,
      }
      let updatePatient = await db.Patients.update(newData, {where: {id: req.params.id}});
      let patient = await db.Patients.findOne({where: {id: req.params.id}})
      let today = new Date()
            let dateBirth = new Date(patient.dateBirth)
            let age = today.getFullYear() - dateBirth.getFullYear()
            let diferenceMonth = today.getMonth() - dateBirth.getMonth()
            if (diferenceMonth < 0 || (diferenceMonth === 0 && today.getDate() < dateBirth.getDate()))
            {
                age--
            }
      res.render("data", {patient : patient, age: age})
  },
};
//------------EXPORTAR MODULO CONTROLADOR USUARIOS------------------
module.exports = controllerPatients;
