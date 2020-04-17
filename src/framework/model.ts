// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import Debug from 'debug';
import { ReflectKeys } from './constants/reflect.keys';
// import { getMetadata } from 'reflect-metadata'
import "reflect-metadata"
import { PropertyParameter, VoidFunc } from './types';
import { IModel } from './interfaces/model.interface';
import { prop } from './prop';
import { Schema } from 'mongoose';

const debug = Debug('framework:prop');

/**
 * declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
 * declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
 * declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
 * declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
 */

/**
 * Model declaration
 *
 * @export
 * @param {Function} target
 */
// tslint:disable-next-line: ban-types
export function Model<TFunction extends Function>(target: TFunction) {

  // save a reference to the original constructor
  const originalConstructor = target;

  // a utility function to generate instances of a class
  function instanciate(Constructor: any, ...args: any[]) {
    const obj = new Constructor(...args);

    const properties: string[] = Object.keys(obj);

    // tslint:disable-next-line: new-parens
    return new class extends Constructor {
      __schema: Record<string, any>;
      constructor() {
        super();
        properties.forEach(p => {
          this[`_${p}`] = obj[p];
          this[p] = obj[p];
          // delete this[p];
        });
        // Object.assign(this[`_${p}`], obj[p]);
      }
    }
  }

  // the new constructor behaviour
  function newConstructor(...args: any[]) {
    return instanciate(originalConstructor, ...args);
  };

  // copy prototype so instanceof operator still works
  newConstructor.prototype = originalConstructor.prototype;

  // return new constructor (will override original)
  return newConstructor as any;
}