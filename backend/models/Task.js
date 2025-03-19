const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",  // Référence au modèle Project
    required: true,
  },
});


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
