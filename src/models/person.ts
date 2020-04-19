import 'reflect-metadata'

import { prop } from '../framework/prop'
import { Model } from '../framework/model';

export class Person extends Model {

  @prop()
  name: string;

  @prop({ required: false })
  age: number;

  constructor(data?: { name?: string, age?: number }) {
    super();
    this.name = data?.name;
    this.age = data?.age;
  }
}