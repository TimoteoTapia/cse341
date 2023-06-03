import express, { Express, Request, Response } from 'express';
import { routerMain } from './mainRoute';
import { oauthRouter } from './oauthRoute';

const router = express.Router();

router.use('/api', routerMain);
router.use('/', oauthRouter);


export { router };
