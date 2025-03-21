const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const resourceRoutes = require("./routes/resourceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/resources", resourceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/GestionProjet')
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Échec de connexion à MongoDB:", err.message));

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});