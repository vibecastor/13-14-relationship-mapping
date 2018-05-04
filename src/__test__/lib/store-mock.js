'use strict';

import faker from 'faker';
import Store from '../../model/store-model';
import coffeeMock from './coffee-mock';

const createStoreMock = () => {
  const resultMock = {};

  return coffeeMock.createCoffeeMock() // creating a coffee record
    .then((createdCoffee) => {
      resultMock.coffee = createdCoffee;

      return new Store({
        name: faker.lorem.words(12),
        location: faker.lorem.words(15),
        coffee: createdCoffee._id,
      }).save();
    })
    .then((newStore) => {
      resultMock.store = newStore;
      return resultMock;
    });
};

const removeStoreMock = () => Promise.all([
  Store.remove({}),
  coffeeMock.removeStoreMock(),
]);

export { createStoreMock, removeStoreMock };

