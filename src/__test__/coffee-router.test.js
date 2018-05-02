'use strict';

import faker from 'faker';
import superagent from 'superagent';
import CoffeeRouter from '../model/coffee';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/coffee`;

const createCoffeeMock = () => {
  return new Coffee({
    brand: faker.lorem.words(10),
    origin: faker.lorem.words(25),
    roast: faker.lorem.words(10),
    roasted: faker.date.recent(),
  }).save();
};

describe('/api/coffee', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  // afterEach(() => Coffee.remove({}));
  test('POST - It should respond with a 200 status if no errors', () => {
    const coffeeToPost = {
      brand: faker.lorem.words(10),
      origin: faker.lorem.words(25),
      roast: faker.lorem.words(10),
      // roasted: faker.date.recent(),
    };
    return superagent.post(apiURL)
      .send(coffeeToPost)
      .then((response) => {
        expect(response.status).toEqual(200);
        // testing for specific values
        expect(response.body.brand).toEqual(coffeeToPost.brand);
        expect(response.body.origin).toEqual(coffeeToPost.origin);
        expect(response.body.roast).toEqual(coffeeToPost.roast);
        // expect(response.body.roasted.toString()).toEqual(coffeeToPost.roasted.toString());
        // are properties present?
        expect(response.body._id).toBeTruthy();
      });
  });
  test('POST - It should response with a 400 status', () => {
    const coffeeToPost = {
      brand: faker.lorem.words(20),
    };
    return superagent.post(apiURL)
      .send(coffeeToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });

  test('409 due to duplicate title', () => { // judy's test from class 13 first am lecture
    return CreateCoffeeMock()
      .then((coffee) => {
        const mockCoffee = {
          brand: faker.lorem.words(10),
          origin: faker.lorem.words(25),
          roast: faker.lorem.words(10),
          roasted: faker.date.recent(),
        };
        return superagent.post(apiURL)
          .send(mockCoffee);
      })
      .then(Promise.reject)
      .catch((error) => {
        expect(error.status).toEqual(409);
      });
  });
  describe('GET /api/coffee', () => {
    test('it should respond with 200 if there are no errors', () => {
      let coffeeToTest = null;
      return createCoffeeMock()
        .then((coffee) => {
          coffeeToTest = coffee;
          return superagent.get(`${apiURL}/${coffee._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.brand).toEqual(coffeeToTest.brand);
          expect(response.body.origin).toEqual(coffeeToTest.origin);
          expect(response.body.roast).toEqual(coffeeToTest.roast);
        });
    });
    test('it should respond with 404 if there is no coffee to be found', () => {
      return superagent.get(`${apiURL}/`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });  
  });
});

describe.only('PUT api/coffee', () => {
  test('200 for successful PUT', () => {
    const coffeeToUpdate = null;
    return CreateCoffeeMock()
      .then((coffee) => {
        coffeeToUpdate = coffee;
        return superagent.put(`${apiURL}/${coffee._id}`)
          .send({ brand: 'I have  new brand!' });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.brand).toEqual('I have  new brand!');
        expect(response.body.brand).toEqual();
        expect(response.body.origin).toEqual();
        expect(response.body.origin).toEqual();
      }); 
  });
});