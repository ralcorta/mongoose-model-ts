// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import 'reflect-metadata'

import Debug from 'debug';
import { PropertyParameter, VoidFunc } from './types';
import { IModel } from './interfaces/model.interface';
import { prop } from './prop';
import { Schema, model } from 'mongoose';
import { ReflectKeys } from './constants/reflect.keys';
import { ReflectSchema } from './constants/symbols';

const debug = Debug('framework:prop');

export class Model {
  constructor(...data: any[]) {
    const children: object = Reflect.getPrototypeOf(this);
    // model(children.constructor.name);
    const list = Reflect.getMetadata(ReflectSchema, children)

    console.log(list);
  }
}