// tslint:disable: no-console
import * as mongoose from 'mongoose';
import { Person } from '../models/person'

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "mongoose-model-ts" });

  /** CREATE  */
  // const model = new Person({ name: 'rodrigo', age: 21 });

  // let person;
  // try {
  //   person = await Person.create({ name: 'rodrigo', age: 21 });
  // } catch (error) {
  //   console.log("Error: ", error);
  // }
  // console.log(person);

  // const p = await Person.findById(person.id);

  // console.log(p);


  /** SAVE */
  // const model = new Person();

  // model.name = "Pedro";

  // model.age = 18;

  // model.save();


  /** FIND */
  // const encontrados: Person = await Person.findOne();

  // console.log(encontrados);

  // const p: Person = encontrados ?? new Person();

  // p.name = "Leonardo";

  // // console.log(!!encontrados);

  // await p.save();
})();
