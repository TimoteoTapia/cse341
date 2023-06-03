import express, { Express, Request, Response } from 'express';
const routerMain = express.Router();

routerMain.get('/main', (req, res) => {
  res.send(`Hello to my API`);
});

export { routerMain };
