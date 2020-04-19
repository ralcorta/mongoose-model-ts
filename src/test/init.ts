import * as mongoose from 'mongoose';
import { Person } from '../models/person'

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "mongoose-model-ts" });

  const model = new Person({ name: 'rodrigo', age: 21 });

  let person;
  try {
    person = await Person.create({ name: 'rodrigo', age: 21 });
  } catch (error) {
    console.log("Error: ", error);
  }

  console.log("Person: ", person);
  // model.save();
})();
