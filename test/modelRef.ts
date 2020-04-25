import 'reflect-metadata'

import { prop } from '../src/prop'
import { Model } from '../src/model';
import { entity } from '../src/entity';

@entity
export class ModelRef extends Model {

  @prop()
  commonString: string;

}