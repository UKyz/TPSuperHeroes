const mongoose = require('mongoose');

const moment = require('moment');

const rp = require('request-promise');

const {getTickets} = require('./get-to-do-list');

const getCity = idCity => {
  return new Promise((resolve => {
    resolve(rp({method: 'POST', uri:
				`${process.env.SLS_CITY}/getCity`, json: true, body:
				{idCity}}));
  }));
};

const updatePosHero = (idHero, cityName, moving) => {
  return new Promise((resolve => {
    mongoose.connect(process.env.DB, {useNewUrlParser: true});
    const heroSchema = require('../model/hero').schema;
    const HeroModel = mongoose.model('heroModel', heroSchema);
    resolve(HeroModel.findByIdAndUpdate(idHero, {pos_: cityName.toString(),
      moving_: moving}).exec());
  }));
};

const deleteAllVillains = cityName => {
  return new Promise(resolve => {
    resolve(rp({method: 'POST', uri:
				`${process.env.SLS_VILLAIN}/deleteVillainsInCity`, json: true, body:
				{city: cityName}}));
  });
};

const getHero = idHero => {
  return new Promise((resolve => {
    mongoose.connect(process.env.DB, {useNewUrlParser: true});
    const heroSchema = require('../model/hero').schema;
    const HeroModel = mongoose.model('heroModel', heroSchema);
    resolve(HeroModel.findById(idHero).exec());
  }));
};

const addScoreToHero = (idHero, score) => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const heroSchema = require('../model/hero').schema;
  const HeroModel = mongoose.model('heroModel', heroSchema);
  // Const myHero = await HeroModel.findById(idHero).exec();
  HeroModel.findByIdAndUpdate(idHero, {score_: score}).exec();
};

const deleteTicket = idTicket => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const toDoListSchema = require('../model/to-do-list').schema;
  const ToDoListModel = mongoose.model('toDoListModel', toDoListSchema);
  ToDoListModel.deleteOne({_id: idTicket}).exec();
};

const updateDurationTicket = (idTicket, duration) => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const toDoListSchema = require('../model/to-do-list').schema;
  const ToDoListModel = mongoose.model('toDoListModel', toDoListSchema);
  ToDoListModel.findByIdAndUpdate(idTicket, {duration_: duration}).exec();
};

const computeNewUpdate = async (idHero, lastUpdate, toDoList) => {
  if (lastUpdate[0] !== undefined) {
    const updateHero = moment(lastUpdate[0].date_);
    let nbSeconds =
			(-moment.duration(moment(updateHero).diff(moment())).asSeconds());
    let cpt = 0;
    let enoughTime = true;
    while (nbSeconds > 0 && cpt < toDoList.length && enoughTime) {
      const ticket = toDoList[cpt];
      if (nbSeconds >= ticket.duration_) {
        getCity(ticket.idCity_).then(city => {
          updatePosHero(idHero, city.name_, false);
          deleteAllVillains(city.name_).then(score => {
            getHero(idHero).then(hero => {
              addScoreToHero(idHero, (score.nbVillainsDeleted + hero.score_));
            });
          });
        });
        deleteTicket(ticket._id);
      } else {
        enoughTime = false;
        getHero(idHero).then(hero => {
          if (!hero.moving_) {
            getCity(ticket.idCity_).then(city => {
              updatePosHero(idHero, `${hero.pos_}move${city.name_}`, true);
            });
          }
        });
        updateDurationTicket(ticket._id, (ticket.duration_ - nbSeconds));
      }
      nbSeconds -= ticket.duration_;
      cpt += 1;
    }
  }
};

const getLastUpdate = idHero => {
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const lastUpdateSchema = require('../model/last-update').schema;
  const LastUpdateModel = mongoose.model('lastUpdateHeroModel',
    lastUpdateSchema);
  return LastUpdateModel.find({idHero_: idHero}, (err, lastUpdate) => {
    if (err) {
      return console.error(err);
    }
    return lastUpdate;
  });
};

const hookHero = async idHero => {
  console.log(`hookHero of ${idHero}`);
  await computeNewUpdate(idHero, await getLastUpdate(idHero),
    await getTickets(idHero));
  mongoose.connect(process.env.DB, {useNewUrlParser: true});
  const lastUpdateSchema = require('../model/last-update').schema;
  const LastUpdateModel = mongoose.model('lastUpdateHeroModel',
    lastUpdateSchema);
  await LastUpdateModel.deleteMany({});
  await new LastUpdateModel({idHero_: idHero,
    date_: moment().format().toString()}).save();
  return 'Ok';
};

module.exports = {
  hookHero
};
