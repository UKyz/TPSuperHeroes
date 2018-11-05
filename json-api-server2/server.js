const add_ = (a, b) => a + b;
const sub_ = (a, b) => a - b;
const mul_ = (a, b) => a * b;
const div_ = (a, b) => a / b;

const nts = (fn, x, y) => String(fn(Number(x), Number(y)));

/* ---- express ---- */

const express = require('express');

const app = express();

app.get('/add', (req, res) => {
  res.status(200).send({result: nts(add_, req.query.var1, req.query.var2)});
});

app.get('/sub', (req, res) => {
  res.status(200).send({result: nts(sub_, req.query.var1, req.query.var2)});
});

app.get('/div', (req, res) => {
  res.status(200).send({result: nts(div_, req.query.var1, req.query.var2)});
});

app.get('/mult', (req, res) => {
  res.status(200).send({result: nts(mul_, req.query.var1, req.query.var2)});
});
app.listen(process.env.PORT);
