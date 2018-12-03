const mongoose = require('mongoose');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.listen(process.env.PORT);

mongoose.connect(process.env.DB, {useNewUrlParser: true});

/* --- Heroes --- */

const heroSchema = require('./models/hero').schema;

const HeroModel = mongoose.model('heroModel', heroSchema);

app.post('/newHero', async (req, res) => {
  await new HeroModel(req.body).save();
  res.send('OK');
});

app.get('/getListAvailableHeroes', async (req, res) => {
  res.send(await HeroModel.find({pos_: {$not: /move/i}},
    (err, heroes) => {
      if (err) {
        return console.error(err);
      }
      return heroes;
    }));
});

/* --- Villain --- */

/* let updateVillain = moment().format();
console.log(updateVillain);

const villainSchema = require('./models/villain').schema;

const VillainModel = mongoose.model('villainModel', villainSchema);

app.post('/newVillain', async (req, res) => {
  await new VillainModel(req.body).save();
  res.send('OK');
  console.log(await seeAllInDb(VillainModel));
});

app.get('/getListVillains', async (req, res) => {
  hookVillain(10);
  res.send(await VillainModel.find((err, villains) => {
    if (err) {
      return console.error(err);
    }
    return villains;
  }));
});

const newVillain = name => {
  console.log('Test');
  rp({method: 'POST', uri: `${process.env.API_SLS}/newVillain`,
    body: {name: `${name}`}, json: true})
    .then(villain => {
      new VillainModel(villain).save();
    });
};

const hookVillain = unitTime => {
  const duration =
    moment.duration(moment(updateVillain).diff(moment()));
  const nbSeconds = (-duration.seconds());
  if (nbSeconds > unitTime) {
    let timeFactor = Math.trunc(nbSeconds / unitTime);
    const timeLess = nbSeconds - (unitTime * timeFactor);
    updateVillain = moment().subtract(timeLess, 'seconds');
    while (timeFactor > 0) {
      newVillain('Test');
      timeFactor -= 1;
    }
  }
}; */

/* --- City --- */

const citySchema = require('./models/city').schema;

const CityModel = mongoose.model('cityModel', citySchema);

app.post('/newCity', async (req, res) => {
  await new CityModel(req.body).save();
  res.send('OK');
  console.log(seeAllInDb(CityModel));
});

/* -- const countVillainsByCities = R.pipe(
  R.map(R.prop('pos_')),
  R.countBy(R.identity),
  R.toPairs,
  R.sortBy(R.descend(R.prop(1))),
);

app.get('/getListCitiesVillains', async (req, res) => {
  res.send(await countVillainsByCities(await VillainModel.find({}).exec())
  );
}); */

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
