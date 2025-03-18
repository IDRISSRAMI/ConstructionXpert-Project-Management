const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour analyser le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/constructionxpert', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connecté');
}).catch(err => {
  console.error(err);
});

// Route de base pour tester si l'API fonctionne
app.get('/', (req, res) => {
  res.send('ConstructionXpert API fonctionne !');
});

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${5000}`);
});
