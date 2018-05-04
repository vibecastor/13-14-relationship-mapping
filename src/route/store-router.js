'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import Store from '../model/store-model';

const jsonParser = bodyParser.json();
const storeRouter = new Router();

storeRouter.post('/api/stores', jsonParser, (request, response, next) => {
  // TODO
  return new Store(request.body).save()
    .then((store) => {
      logger.log(logger.INFO, 'STORE ROUTER - POST - responding with a 200 status code');
      response.json(store);
    })
    .catch(next);
});

storeRouter.put('/api/store/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };

  return Store.findByIdAndUpdate(request.params.id, request.body, options)
  , then((updatedStore) => {
    if (!updatedStore) {
      logger.log(logger.INFO, 'STORE-ROUTER - PUT - responding with a 404 status');
      return next(new HttpError(404, 'store not found'));
    }
    logger.log(logger.INFO, 'STORE-ROUTER - PUT = responding with a 200 status');
    return response.json(updatedStore);
  })
    .catch(next);
});

export default storeRouter;
