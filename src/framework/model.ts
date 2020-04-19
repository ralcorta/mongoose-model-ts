// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import 'reflect-metadata'

import Debug from 'debug';
import { PropertyParameter, RecordSchema, StaticThis } from './types';
import { model, Document, Model as MongooseModel, models, Schema, SchemaDefinition } from 'mongoose';
import { ReflectKeys } from './constants/reflect.keys';
import { ReflectSchema, ReflectModel } from './constants/symbols';


const debug = Debug('framework:prop');

//     return method.apply(that, args);

//   };
// }

// export interface IModelDocument extends Model, Document {

// }

// // here we are defining interface for model, and our example find function
// export interface IModel extends MongooseModel<IModelDocument> {

// }

export abstract class Model {
  constructor(...data: any[]) {
    const children: object = Reflect.getPrototypeOf(this);

    const schema: RecordSchema = Reflect.getMetadata(ReflectSchema, children);

    /// USE models?
    let doc: MongooseModel<Document>;
    try {
      doc = model(children.constructor.name, new Schema(schema as SchemaDefinition));
    } catch {
      doc = model(children.constructor.name);
    }

    Reflect.defineMetadata(ReflectModel, doc, children);
  }

  private getDoc(): MongooseModel<Document> {
    const children: object = Reflect.getPrototypeOf(this);
    return Reflect.getMetadata(ReflectModel, children) as MongooseModel<Document>;
  }

  // static create<T>(this: new () => T, data: object): T {
  // this: new (...data: any[]) => T,

  public static async create<T extends Model>(this: StaticThis<T>, data: object): Promise<T> {
    try {
      const that = new this(data) as T;
      return that.save();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async save(): Promise<this> {
    try {
      const doc = this.getDoc().create(this);
    } catch (err) {
      return Promise.reject(err);
    }
  }


  // static async _save(properties: {}): Promise<That> {
  //   return new Model(this.doc().create(properties));
  // }

  // private static doc(): MongooseModel<Document> {
  //   const children: object = Reflect.getPrototypeOf(this);
  //   return model(children.constructor.name);
  // }
}