import { Person } from '../models/person'

const model = new Person({ name: 'rodrigo', age: 21 });
const model2 = new Person({ name: 'rodrigo', age: 21 });


// console.dir(Person);
console.log(model);
console.log(model2);
// console.log(model.name, model.age);
// console.dir({ ...model });