const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const scene = require('./scene');
const cards = require('./data');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/idee_scene/:id', function (req, res) {
  const id = req.params.id;
  const foundScene = scene.find(item => item.id === parseInt(id, 10));

  if (foundScene) {
    res.json(foundScene);
  } else {
    res.status(404).json({ message: 'Scene non trouvé' });
  }
});

app.put('/api/idee_scene/:id', (req, res) => {
 
  const id = req.params.id;
  
  const updatedArticle = req.body;
  const articleIndex = scene.find(article => article.id === parseInt(id,10));

  if (articleIndex) {
    scene[articleIndex] = { ...scene[articleIndex], ...updatedArticle };
    res.json(scene[articleIndex]);
    console.log(scene[articleIndex]);
  } else {
    res.status(404).json({ message: 'Scene non trouvé' });
  }
  return
});


app.post('/api/idee_scene', function (req, res) {
  
  res.send("Proposition de scène ajoutée");
  console.log(req.body);
});

app.delete('/api/idee_scene/:id', function (req, res) {

  const id = req.params.id;
  const updatedArticle = req.body;
  const articleIndex = scene.find(article => article.id === id);
  res.send("Scène supprimée définitivement");
  
});


app.use('/api/cards', (req, res, next) => {
    res.status(200).json(cards);
});

app.use('/api/scene', (req, res, next) => { 
  res.status(200).json(scene);
});


module.exports = app;