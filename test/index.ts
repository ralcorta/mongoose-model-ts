// tslint:disable: no-console
import * as mongoose from 'mongoose';
import { Person } from './model'
import { Dog } from '../test/dog';
import { resolve } from 'path';
import { runLoopOnce } from 'deasync';
import deasync = require('deasync');

async function ref() {
  try {

    const person = new Person({ name: 'Rodrigo', dog: new Dog({ name: 'Yeny' }) });

    console.log(person);

  } catch (error) {
    console.log("Error: ", error);
    return;
  }
}

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "mongoose-model-ts" });


})();
