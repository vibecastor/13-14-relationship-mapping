'use strict';

import mongoose from 'mongoose'; 

const coffeeSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  roast: {
    type: String,
    required: true,
  },
  roasted: {
    type: Date,
    default: () => new Date(),
  },
  stores: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'stores',
    },
  ],
}, {
  usePushEach: true,
});

// Mongoose wants to create a model out of a schema
export default mongoose.model('coffee', coffeeSchema);
