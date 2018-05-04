'use strict';

import faker from 'faker';
import coffee from '../../model/coffee-model';

const createCoffeeMock = () => {
  return new Coffee({
    brand: faker.lorem.words(10),
    origin: faker.lorem.words(25),
    roast: faker.lorem.words(10),
    roasted: faker.date.recent(),
  }).save();
};

const removeCoffeeMock = () => Coffee.remove({});

default 