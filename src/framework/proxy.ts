import { ReflectSchema, ReflectDoc, ReflectModel } from './constants/symbols';
import { Document, Model as MongooseModel } from 'mongoose';

/**
 * A Proxy for all getters of model
 *
 * @export
 * @class Proxify
 */
export class Proxify {
  constructor() {
    return new Proxy(this, this);
  }

  public get(target: any, prop: string): Promise<any> {
    if (this.hasOwnProperty(prop)) {
      const schema = Reflect.getMetadata(ReflectSchema, target);

      if (schema[prop].ref) {
        // MongooseModel<Document>
        const model = Reflect.getMetadata(ReflectModel, target);

        // console.log(schema[prop].ref);
        // console.log(doc.populate(schema[prop].ref));
        // (async () => {
        //   console.log(prop, target[prop]);
        //   console.log(await model.populate(target[prop]));
        // })()

        return target[prop]// = model.findById(target[prop]).exec();
      }
    }

    return target[prop];
  }

  set(target: any, prop: string, value: any, receiver: any): boolean {
    const type = value.constructor

    target[prop] = value;

    return true;
  }
}