// tslint:disable: no-console
import * as mongoose from 'mongoose';
import { Model } from './model'
import { ModelRef } from './modelRef';
import { resolve } from 'path';
import { runLoopOnce } from 'deasync';
import deasync = require('deasync');

// async function ref() {
//   try {

//     const person = new Model({ name: 'Rodrigo', dog: new ModelRef({ name: 'Yeny' }) });

//     console.log(person);

//   } catch (error) {
//     console.log("Error: ", error);
//     return;
//   }
// }

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "mongoose-model-ts" });

  const singleRef: ModelRef = await ModelRef.create({ commonString: 'Reference' });

  const oldModel = await Model.create({ commonString: 'Rodrigo', commonNumber: 21, singleRef });

  const foundModel = await Model.findById(oldModel.id);

  console.log("Final data: ", foundModel.singleRef);

  console.log("Final data: ", foundModel.getId('singleRef'));
})();
