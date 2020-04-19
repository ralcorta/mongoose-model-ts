import 'reflect-metadata'

import { prop } from '../framework/prop'
import { Model } from '../framework/model';
import { ReflectSchema } from '../framework/constants/symbols';

/**
 *  Person class
 *
 * @export
 * @class Person
 */
export class Person extends Model {

  constructor(data?: { name?: string, age?: number }) {
    super();

    // const list = Reflect.getOwnMetadata(ReflectSchema, this)
    // console.log(list);

    this.name = data?.name;
    this.age = data?.age;
  }

  @prop()
  name: string;

  @prop({ required: false })
  age: number;
}