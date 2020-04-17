// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import Debug from 'debug';
import { ReflectKeys } from './constants/reflect.keys';
// import { getMetadata } from 'reflect-metadata'
import "reflect-metadata"
import { PropertyParameter } from './types';

const debug = Debug('framework:prop');

/**
 * declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
 * declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
 * declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
 * declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
 */

/**
 * @export
 * @param {Record<string, any>} [options={}]
 * @public
 */
export function prop(options: PropertyParameter = {}) {

  /**
   * @param {any} target Class itself
   * @param {string} propertyName Name of the property under decorator
   */
  return (target: any, propertyName: string) => {
    type T = typeof target;

    let _val = target[propertyName];

    if (!target['__schema']) {
      target['__schema'] = {}
    }

    Object.defineProperty(target['__schema'], propertyName, {
      value: String,
      enumerable: true,
      configurable: true
    });

    console.log(target['__schema'])

    const constr = Reflect.getMetadata(ReflectKeys.Type, target, propertyName);

    const getter = function () {
      console.log(`Get: ${propertyName} => ${_val}`);
      return _val;
    };

    const setter = function (value: any) {
      console.log(`Set: ${propertyName} => ${value}`);
      // if (!(value instanceof constr) && (typeof value !== constr.name.toLocaleLowerCase())) {
      //   throw new Error(`Failed to set "${propertyName}": ${constr.name} expected, got ${typeof value}`);
      // }
      _val = value + ' [PROPR]';
    };

    // console.log(propertyName, target[propertyName]);
    // console.log(`_${propertyName}`, target[`_${propertyName}`]);
    // if (delete target[propertyName]) {
    // Object.defineProperty(target, propertyName, {
    //   get: getter,
    //   set: setter,
    //   enumerable: true,
    //   configurable: true
    // });
    // }
  }
}