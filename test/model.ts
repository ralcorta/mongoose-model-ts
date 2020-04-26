import 'reflect-metadata'

import { prop } from '../src/prop'
import { Model as FrameworkModel } from '../src/model';
import { ModelRef } from './modelRef';
import { entity } from '../src/entity';
import { plugin } from '../src/plugin';
import * as mongoose_delete from 'mongoose-delete';
import { pre } from '../src/hooks';

@entity
@plugin(mongoose_delete)
export class Model extends FrameworkModel {

  @pre('save')
  prehook() {
    console.log("HOOK RELEASED");
  }

  @prop()
  commonString: string;

  @prop({ required: false })
  commonNumber: number;

  @prop({ ref: ModelRef })
  singleRef: ModelRef;

}