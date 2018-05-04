'use strict';

import mongoose from 'mongoose';
import HttpError from 'http-errors';
import Coffee from './coffee-model';

const Store = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
  },
  directions: {
    type: String,
  },
});

function storePreHook(done) {
  return Coffee.findById(this.coffee)
    .then((coffeeFound) => {
      if (!coffeeFound) {
        throw new HttpError(404, 'STORE-MODEL: no coffee found');
      }
      coffeeFound.stores.push(this._id);
      return coffeeFound.save();
    })
    .then(() => done())
    .catch(done);
}

const storePostHook = (document, done) => {
  return Coffee.findById(document.coffee)
    .then((coffeeFound) => {
      if (!coffeeFound) {
        throw new HttpError(500, 'STORE-MODEL: coffee not found');
      }
      coffeeFound.stores = coffeeFound.stores.filter((store) => {
        return store._id.toString() !== document._id.toString();
      });
    })
    .then(() => done())
    .catch(done);
};

storeSchema.pre('save', storePreHook);
storeSchema.post('remove', storePostHook);

export default mongoose.model('store', Store);
