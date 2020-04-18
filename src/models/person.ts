import { prop } from '../framework/prop'
// import { Model } from '../framework/model.decorator';

/**
 *  Person class
 *
 * @export
 * @class Person
 */
export class Person {

  constructor(data?: { name?: string, age?: number }) {
    this.name = data?.name;
    this.age = data?.age;
  }

  @prop()
  name: string;

  @prop()
  age: number;
}