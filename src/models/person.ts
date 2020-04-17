import { prop } from '../framework/prop'
import { Model } from '../framework/model';
import { IModel } from '../framework/interfaces/model.interface';


/**
 *  Person class
 *
 * @export
 * @class Person
 */
@Model
export class Person {

  @prop()
  name: string;

  @prop()
  age: number;

  constructor(data?: { name: string, age: number }) {
    this.name = data?.name;
    this.age = data?.age;
  }

}