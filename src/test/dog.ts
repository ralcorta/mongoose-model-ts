import 'reflect-metadata'

import { prop } from '../framework/prop'
import { Model } from '../framework/model';
import { entity } from '../framework/entity';

@entity
export class Dog extends Model {

  @prop()
  name: string;

}