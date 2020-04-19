// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import 'reflect-metadata'

import Debug from 'debug';
import { PropertyParameter, VoidFunc } from './types';
import { IModel } from './interfaces/model.interface';
import { prop } from './prop';
import { Schema, model, Mongoose, Document, Model as MongooseModel, connection } from 'mongoose';
import { ReflectKeys } from './constants/reflect.keys';
import { ReflectSchema, ReflectModel } from './constants/symbols';

const debug = Debug('framework:prop');

export class Model {
  // private readonly _model: MongooseModel<Document>;

  constructor(...data: any[]) {
    const children: object = Reflect.getPrototypeOf(this);

    const schema = Reflect.getMetadata(ReflectSchema, children)

    let doc: MongooseModel<Document>;
    try {
      doc = model(children.constructor.name, new Schema(schema));
    } catch {
      doc = model(children.constructor.name);
    }

    Reflect.defineMetadata(ReflectModel, doc, children)
  }
}