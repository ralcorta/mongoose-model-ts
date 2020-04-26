// tslint:disable: no-console
import * as mongoose from 'mongoose';
import { Model } from './model'
import { ModelRef } from './modelRef';
import { Collection } from '../src/collection';

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "mongoose-model-ts" });

  const models = [];

  for (let i = 0; i < 3; i++) {
    models.push(new Model({ commonString: `Name ${i}`, commonNumber: i }));
  }

  let collect;
  try {
    collect = new Collection<Model>(models);
  } catch (error) {
    console.log(error)
  }

  // collect.push();

  console.log(collect.first())
})();
