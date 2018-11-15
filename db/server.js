const mongoose = require('mongoose');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.listen(3010);

mongoose.connect(process.env.DB, {useNewUrlParser: true});

/* --- Heroes --- */

const heroSchema = require('./models/hero').schema;

const HeroModel = mongoose.model('heroModel', heroSchema);

app.post('/newHero', async (req, res) => {
  await new HeroModel(req.body).save();
  res.send('OK');
  console.log(seeAllInDb(HeroModel));
});

/* --- Villain --- */

const villainSchema = require('./models/villain').schema;

const VillainModel = mongoose.model('villainModel', villainSchema);

app.post('/newVillain', async (req, res) => {
  await new VillainModel(req.body).save();
  res.send('OK');
  console.log(seeAllInDb(VillainModel));
});

/* --- City --- */

const citySchema = require('./models/city').schema;

const CityModel = mongoose.model('cityModel', citySchema);

app.post('/newCity', async (req, res) => {
  await new CityModel(req.body).save();
  res.send('OK');
  console.log(seeAllInDb(CityModel));
});

/* --- Mount --- */

const mountSchema = require('./models/mount').schema;

const MountModel = mongoose.model('mountModel', mountSchema);

app.post('/newMount', async (req, res) => {
  await new MountModel(req.body).save();
  res.send('OK');
  console.log(seeAllInDb(MountModel));
});

/* --- Functions --- */

const seeAllInDb = Model => {
  Model.find((err, data) => {
    if (err) {
      return console.error(err);
    }
    return data;
  });
};
