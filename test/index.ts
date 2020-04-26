// tslint:disable: no-console
import * as mongoose from 'mongoose';
import { Model } from './model'
import { ModelRef } from './modelRef';
import { Collection } from '../src/collection';

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "mongoose-model-ts" });

  const singleRef = new ModelRef({ commonString: "Common" });

  const model = new Model({ commonString: "Rodrigo", commonNumber: 21, singleRef });

  model.save();

  console.log(model);
})();
