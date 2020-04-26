// tslint:disable: no-console
import * as mongoose from 'mongoose';
import { Model } from './model'
import { ModelRef } from './modelRef';
import { Collection } from '../src/collection';

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "mongoose-model-ts" });

  const person = new Model({ commonString: "Rodrigo", commonNumber: 21 });

  // person.save();

  // const result = await Model.findById(person.id);

  // console.log(result);
})();
