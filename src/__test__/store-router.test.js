'use strict';

// npm modules
import faker from 'faker';
import superagent from 'superagent';
// internal modules
import { startServer, stopServer } from '../lib/server';
import { createStoreMock, removeStoreMock } from './lib/store-mock';
import { createCoffeeMock } from './lib/coffee-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api/stores`;

describe('/api/stores', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(removeStoreMock);

  describe('POST /api/stores', () => {
    test('STORE-ROUTER: 200 status code in creation', () => {
      return createCoffeeMock()
        .then((coffeeMock) => {
          const storeToPost = {
            name: faker.lorem.words(12),
            location: faker.lorem.words(15),
            coffee: coffeeMock._id,
          };

          return superagent.post(apiUrl)
            .send(storeToPost)
            .then((response) => {
              expect(response.status).toEqual(200);
            });
        });
    });
  });

  describe('PUT /api/stores', () => {
    test('STORE-ROUTER: 200 status code in creation', () => {
      let storeToUpdate = null;
      return createStoreMock()
        .then((mock) => {
          storeToUpdate = mock.store;
          return superagent.put(`${apiUrl}/${mock.store._id}`)
            .send({ name: 'Cafe Vivace' });
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Cafe Vivace');
          expect(response.body.location).toEqual(storeToUpdate.location);
        });
    });
  });
  // describe...
});
