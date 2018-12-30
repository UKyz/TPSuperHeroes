const rp = require('request-promise');

const moment = require('moment');

const R = require('ramda');

const getListCities = async () => {
  const listVillains = await rp({uri: `${process.env.SLS_VILLAIN}/getVillains`,
    json: true});
  const villainsByCities = await rp({method: 'POST', uri:
      `${process.env.SLS_VILLAIN}/countVillainsByCities`, json: true, body:
    listVillains});

  console.log('Villains detected : ');
  console.log(villainsByCities);

  const cities = await rp({method: 'GET', uri:
      `${process.env.SLS_CITY}/getCities`, json: true});

  cities.forEach(city => {
    let hasVillain = false;
    villainsByCities.forEach(elm => {
      if (elm.name === city.name_) {
        hasVillain = true;
        elm.id = city._id;
        elm.pos = {x: city.latitude_, y: city.longitude_};
      }
    });
    if (!hasVillain) {
      villainsByCities.push({
        id: city._id,
        name: city.name_,
        score: 0,
        pos: {x: city.latitude_, y: city.longitude_}
      });
    }
  });

  return villainsByCities;
};

const getListAvailableMounts = () => {
  return rp(
    {method: 'GET', uri: `${process.env.SLS_MOUNT}/getMounts`, json: true});
};

const getListAvailableHeroes = () => {
  return rp(
    {method: 'GET', uri: `${process.env.SLS_HERO}/getHeroes`, json: true});
};

const installCities = () => {
  return rp({method: 'POST', uri: `${process.env.SLS_CITY}/installCities`});
};

const installHero = () => {
  return rp({method: 'POST', uri: `${process.env.SLS_HERO}/installHero`});
};

const removeMounts = idTab =>
  new Promise(resolve => {
    resolve(rp({
      method: 'POST', uri: `${process.env.SLS_MOUNT}/removeMounts`, json: true,
      body: idTab
    }));
  });

const updateListCities = async (listCities, optimiseRes) =>
  new Promise(resolve => {
    optimiseRes.forEach(city => {
      listCities.forEach(cityVillain => {
        if (cityVillain.id === city.id) {
          cityVillain.score = 0;
        }
      });
    });
    resolve(listCities);
  });

const manageMovesHeroes = async (listCities, listHeroes, listMounts) => {
  let now = moment();
  let optimiseRes = [];
  await listHeroes.reduce(async (promise, hero) => {
    await promise;
    await updateListCities(listCities, optimiseRes).then(async newCities => {
      await getOptimisePath(newCities, hero, listMounts).then(async res => {
        const mountsToDelete = R.map(R.prop('id'), res.mountsUsed);
        await removeMounts(mountsToDelete).then(() => {
          optimiseRes = res.distanceTraveled;
          optimiseRes.forEach(city => {
            now = moment(now).add(10, 'ms');
            rp({method: 'POST', uri: `${process.env.SLS_HERO}/addTicket`,
              json: true, body: {
                idHero_: res.idHero,
                idCity_: city.id,
                duration_: city.duration,
                dateCreation_: now.format('YYYY-MM-DD HH:mm:ss:SS')
              }
            });
          });
        });
      });
    });
  }, Promise.resolve());
};

const getOptimisePath = async (cities, hero, mounts) => new Promise(resolve => {
  resolve(rp({method: 'POST', uri: `${process.env.SLS_OPTI}/optimisePath`,
    json: true, body: {cities, hero, mounts}}));
});

const main = () => {
  setInterval(async () => {
    const listAvailableHeroes = await getListAvailableHeroes();
    const listCityVillain = await getListCities();
    const listMounts = await getListAvailableMounts();
    if (listAvailableHeroes.length > 0 && listCityVillain.length > 0) {
      await manageMovesHeroes(listCityVillain, listAvailableHeroes, listMounts);
    }
  }, 30000);
};

setTimeout(async () => {
  console.log('Let\'s go !');
  console.log(`Installation cities : ${await installCities()}`);
  console.log(`Installation hero : ${await installHero()}`);
  main();
}, 20000);
