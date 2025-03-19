const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const projectRoutes = require("./routes/projetctRoutes");
 const taskRoutes = require("./routes/TaskRoutes");
 const resourceRoutes = require("./routes/resourceRoutes");


const app = express();
const port = process.env.PORT|| 5000;
// middleware 
app.use(cors());
app.use(express.json());//paRSER LES REQUETE JSON
app.use("/api", projectRoutes);
app.use("/api",taskRoutes);
app.use("/api",resourceRoutes);
// conexion a mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log(err));

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur backend lancé sur http://localhost:${port}`);
});