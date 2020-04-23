import 'reflect-metadata'

import { prop } from '../framework/prop'
import { Model } from '../framework/model';
import { Dog } from './dog';
import { entity } from '../framework/entity';

@entity
export class Person extends Model {

  @prop()
  name: string;

  @prop({ required: false })
  age: number;

  @prop({ ref: Dog })
  dog: Dog;

}