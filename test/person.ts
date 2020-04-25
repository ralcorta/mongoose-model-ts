import 'reflect-metadata'

import { prop } from '../src/prop'
import { Model } from '../src/model';
import { Dog } from './dog';
import { entity } from '../src/entity';

@entity
export class Person extends Model {

  @prop()
  name: string;

  @prop({ required: false })
  age: number;

  @prop({ ref: Dog })
  dog: Dog;

}