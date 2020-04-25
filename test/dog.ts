import 'reflect-metadata'

import { prop } from '../src/prop'
import { Model } from '../src/model';
import { entity } from '../src/entity';

@entity
export class Dog extends Model {

  @prop()
  name: string;

}