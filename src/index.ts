// tslint:disable: no-console
import * as mongoose from 'mongoose';
import { Person } from './models/person'
import { Dog } from './models/dog';
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
}

async function updateWithSave() {
  const p = await Person.findOne({});

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

  // const dog = new Dog({ name: 'Yeny' });

  // // await dog.save();

  // const model = new Person({ name: 'rodrigo', age: 21, dog });

  // console.log(await model.save());
  // let person;
  // try {
  //   person = await model.save();// await Person.create({ name: 'rodrigo', age: 21 });
  // } catch (error) {
  //   console.log("Error: ", error);
  //   return;
  // }

  // console.log(person);

  /** TRY ASYNC */
  // var result: any;
  // var error: Error;
  // var done = false;

  // const p = Person.findOne().then((res: any) => { console.log("Trajo algo: ", res); result = res; done = true })
  //   .catch((err: any) => { console.log("Error: ", err); error = err })
  //   .finally(() => {
  //     console.log("Fin.");
  //     done = true;
  //   });

  // // p.

  // let i = 0
  // while (!done && i < 20) {
  //   runLoopOnce();
  //   i++;
  //   // deasync.loopWhile(() => { i++; /*console.log(done)*/; return !done && i < 1 });
  // }

  // if (error)
  //   throw error;

  // console.log(`Result: (${done})`, result);

  /** TRY GETTER */
  const p = await Person.findOne();
  console.log(p.dog)


  /** TRY MORE */
  // const promiseWhichWillBeRejected = new Promise((resolv, reject) => {
  //   console.log("Promeza rechazada...")
  //   reject("OHH");
  // })

  // const promiseWhichWillBeResolved = new Promise((resolv, reject) => {
  //   let i = 0;
  //   while (i < 10000000)
  //     i++;
  //   console.log("Promeza...")
  //   resolv();
  // })

  // console.log(promiseWhichWillBeResolved);

  // let syncResult = deasyncPromise(promiseWhichWillBeResolved)

  // try {
  //   let syncResult = deasyncPromise(promiseWhichWillBeRejected)
  // } catch (err) {
  //   console.log(err)
  // }

})();
