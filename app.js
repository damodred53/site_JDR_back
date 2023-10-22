require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const scene = require('./scene');
const mongoose = require('mongoose');
const Scene = require('./Models/Scene');

const path = require('path');
const nodemailer =  require('nodemailer');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "page/index.html")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "page/index.html"));
})

app.post('/api/send_email', function (req,res) {
  const contentMailFrom = req.body.email;
  const contentMail = req.body.description;
  const contentMail_2 = req.body.explication;
  const objectMail = "nouvelle idée de scène JDR";
  console.log(contentMailFrom + ''  + contentMail + '' + contentMail_2);

  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'florent.guyard@live.fr',
      pass: 'Damodred536753.'
    }
  });
  const mailOptions = {
    from: contentMailFrom,
    to: 'florent.guyard@live.fr',
    subject: objectMail,
    text : contentMail + " " + contentMail_2,
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent" + info.response);
    }
    response.redirect("/");
  })
})





mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



/* Gestion du CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* chercher un élément par son ID */
app.get('/api/idee_scene/:id', async function (req, res) {
  const id = req.params.id;
  const foundScene = await Scene.findById(id);
  if (foundScene) {
    res.json(foundScene);
  } else {
    res.status(404).json({ message: 'Scene non trouvé' });
  }
});

/* Modification d'un élément*/ 
app.patch('/api/idee_scene/:id', async function (req, res) {
 
  const id = req.params.id;
  try {
    const sceneToUpdate = await Scene.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.send(sceneToUpdate);

  } catch (err) {
    res.status(400).send(err);
  }

});

/* Création d'un élément */
app.post('/api/idee_scene',  async function (req, res) {
  
  try {
    sceneObject = req.body;
    delete sceneObject.email;
    console.log(sceneObject);
    const newScene = new Scene( {
      ...sceneObject,
    })
    await newScene.save();
    res.status(201).send(newScene);

  } catch (err) {
    res.status(400).send(err);
  }
  

});

/* Suppression d'un élément */
app.delete('/api/idee_scene/:id', async function (req, res) {
  const id = req.params.id;

try {
  const sceneToDelete = await Scene.findByIdAndDelete(id);

  if (!sceneToDelete) {
    return res.status(404).send("Scène non trouvé");
  }   else {
    res.send(sceneToDelete);
  }
} catch(err) {
  res.status(400).send(err);
}
  
    
});

/* Chercher toutes les scènes */

app.get('/api/scene', async (req, res, next) => {

  try {
    const searchednewScene = await Scene.find({})
    res.send(searchednewScene);
  } catch (err) {
    res.status(500).send(err);
  }
    
});

module.exports = app;