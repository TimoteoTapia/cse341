const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');

const port = process.env.Port || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    //line 11-17 is needed to give authorization to be desploy in other frontend works
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
  }
});
