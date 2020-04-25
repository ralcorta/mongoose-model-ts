import 'reflect-metadata'

import { prop } from '../src/prop'
import { Model as FrameworkModel } from '../src/model';
import { ModelRef } from './modelRef';
import { entity } from '../src/entity';

@entity
export class Model extends FrameworkModel {

  @prop()
  commonString: string;

  @prop({ required: false })
  commonNumber: number;

  @prop({ ref: ModelRef })
  singleRef: ModelRef;

}