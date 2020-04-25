// tslint:disable: no-console
import * as mongoose from 'mongoose';
import { Person } from '../test/person'
import { Dog } from '../test/dog';
import { resolve } from 'path';
import { runLoopOnce } from 'deasync';
import deasync = require('deasync');

async function create() {
  const model = new Person({ name: 'rodrigo', age: 21 });

  let person;
  try {
    person = await Person.create({ name: 'rodrigo', age: 21 });
  } catch (error) {
    console.log("Error: ", error);
    return;
  }

  console.log(person);

  const p = await Person.findById(person.id);

  console.log("Found in DB: ", !!p);
}

async function save() {
  const person = new Person();

  person.name = "Rodrigo";

  person.age = 18;

  try {
    person.save();
  } catch (error) {
    console.log("Error: ", error);
    return;
  }

  const p = await Person.findById(person.id);

  console.log("Found in DB: ", p);

  return p;
}

async function updateWithSave() {
  let p = await Person.findOne({});

  if (!p)
    p = await save();

  p.name = "CARLOS [Editado2]";

  try {
    await p.save();
  } catch (error) {
    console.log("Error: ", error);
    return;
  }

  const newP: Person = await Person.findById(p.id);

  console.log(newP)
}

async function update() {
  const p = await Person.findOne({});

  p.name = "CARLOS [3]";

  try {
    await p.update();
  } catch (error) {
    console.log("Error: ", error);
    return;
  }

  const newP: Person = await Person.findById(p.id);

  console.log(newP)
}

async function deleteModel() {
  const p = await Person.findOne({});

  try {
    await p.delete();
  } catch (error) {
    console.log("Error: ", error);
    return;
  }

  const newP: Person = await Person.findById(p.id);

  console.log(newP)
}

async function deleteManyModel() {
  try {
    return await Person.deleteMany();
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
}

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

  // create();
  // save();
  // updateWithSave();
  // update();
  // deleteModel();
  // deleteManyModel();
  // ref();

  // const person = new Person({ name: "Rodrigo", age: 21 });

  // person.save();

  // const result = await Person.findById(person.id);

  // console.log(result)


})();
