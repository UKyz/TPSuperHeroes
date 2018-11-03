#!/usr/bin/env node
/*const app = require('express')();
const API = require('json-api');
const mongoose = require('mongoose');
require('dotenv').config();

if (!process.env.BASE_URL || !process.env.SUFFIX_URL || !process.env.PORT) {
  console.log('You should check if your environment variables are good.');
  process.exit(1);
}

const dbURL = process.env.DB || 'mongodb://127.0.0.1:27017/dev-yahoo-finance';

const APIError = API.types.Error;
mongoose.connect(dbURL, {useMongoClient: true});

const models = {
  Hero: require('./models/hero').model,
  Villain: require('./models/villain').model
};

const registryTemplates = {
  heroes: require('./models/hero').registry,
  villains: require('./models/villain').registry
};

const adapter = new API.dbAdapters.Mongoose(models);
const registry = new API.ResourceTypeRegistry(registryTemplates,
  {dbAdapter: adapter});

const docs = new API.controllers.Documentation(registry, {name: 'Stock API'});
const controller = new API.controllers.API(registry);
const front = new API.httpStrategies.Express(controller, docs);

const apiReqHandler = front.apiRequest.bind(front);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
  res.header('Access-Control-Allow-Methods',
    'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

const db = [
  'heroes',
  'villains'
];

app.options('*', (req, res) => {
  res.send();
});

app.get('/api', front.docsRequest.bind(front));

app.route(`/api/:type(${db.join('|')})`).get(apiReqHandler).post(apiReqHandler)
  .patch(apiReqHandler);

app.route(`/api/:type(${db.join('|')})/:id`).get(apiReqHandler)
  .patch(apiReqHandler)
  .delete(apiReqHandler);

app.route(`/api/:type(${db.join('|')})/:id/relationships/:relationship`)
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler)
  .delete(apiReqHandler);

app.use((req, res) => {
  front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});


app.listen(process.env.PORT);*/

/* ---- HTTP ---- */

const http = require('http');
const url = require('url');

const add_ = (a, b) => a + b;
const sub_ = (a, b) => a - b;
const mul_ = (a, b) => a * b;
const div_ = (a, b) => a / b;

const nts = (fn, x, y) => String(fn(Number(x), Number(y)));

/*const server = http.createServer((req, res) => {
 const urlRequest = url.parse(req.url, true, true);

 if (urlRequest.pathname === '/add') {
 res.end(nts(add_, urlRequest.query.var1, urlRequest.query.var2));
 } else if (urlRequest.pathname === '/sub') {
 res.end(nts(sub_, urlRequest.query.var1, urlRequest.query.var2));
 } else if (urlRequest.pathname === '/mul') {
 res.end(nts(mul_, urlRequest.query.var1, urlRequest.query.var2));
 } else if (urlRequest.pathname === '/div') {
 res.end(nts(div_, urlRequest.query.var1, urlRequest.query.var2));
 }
 res.end('404');
 });

 server.listen(3000);*/

/* ---- express ---- */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/*mongoose.connect(process.env.DB || 'mongodb://localhost:27017/deco-test',
  {useNewUrlParser: true});

const blobSchema = new mongoose.Schema({
  blob: Object
});

const Blob = mongoose.model('Blob', blobSchema);
const app = express();
app.use(bodyParser.json());*/

app.get('/add', (req, res) => {
  res.status(200).send({result : nts(add_, req.query.var1, req.query.var2)});
});

app.get('/sub', (req, res) => {
  res.status(200).send({result : nts(sub_, req.query.var1, req.query.var2)});
});

app.get('/div', (req, res) => {
  res.status(200).send({result : nts(div_, req.query.var1, req.query.var2)});
});

app.get('/mult', (req, res) => {
  res.status(200).send({result : nts(mul_, req.query.var1, req.query.var2)});
});

/*app.post ('/push-db', (req, res) => {
 console.log(req.body);
 res.send('OK');
 });*/

/*app.post('/push-db', async (req, res) => {
  await new Blob({blob: req.body}).save();
  res.send('OK');
});*/

/*app.post('/toto', async (req, res) => {
 res.Send(await Blob.find({}).exec())
 });*/

app.listen(process.env.PORT);

/* requete : http://localhost:3000/sub?var1=2&var2=3 */
