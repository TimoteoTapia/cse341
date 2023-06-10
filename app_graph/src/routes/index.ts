import express, { Express, Request, Response } from 'express';
import { routerMain } from './main';
import { oauthRouter } from './oauth';

const router = express.Router();

router.use('/api', routerMain);
router.use('/', oauthRouter);

export { router };
