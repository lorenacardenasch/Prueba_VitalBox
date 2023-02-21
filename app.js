//----------REQUERIMIENTOS-------------------------------------
const express = require("express"); //Traigo la libreria express
const app = express(); //Utilizo express
const path = require("path"); //traigo path
const methodOverride = require('method-override'); //utilizar el metodo put y delete 
const cors = require('cors');
//-------------------------IMPORTACION ENRUTADORES------------------------------------------------------
const patientsRouters = require("./src/routes/patientsRouters"); //se trae el enrutador
//----------------MIDDLEWARES-----------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, './public')));//vuelve publica la carpeta public
app.use(express.urlencoded({extended:false})); // utilizar el metodo POST
app.use(express.json()); // utilizar el mtodo post
app.use(methodOverride('_method')); //utilizar el metodo put y delete 
app.use(cors());
//-------------TEMPLATE ENGINE--------------------------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views")); // Define la ubicación de la carpeta de las Vistas
//-------------------------RUTAS------------------------------------------------------
app.use("/", patientsRouters); //ruta global
//-------------------SE CARGA EL PUERTO-------------------------------------------------
app.listen(process.env.PORT || 3001, function () {
  console.log("servidor corriendo en puerto 3001");
});
