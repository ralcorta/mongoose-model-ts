import 'reflect-metadata'

import { prop } from '../framework/prop'
import { Model } from '../framework/model';

export class Dog extends Model {

  @prop()
  name: string;

}