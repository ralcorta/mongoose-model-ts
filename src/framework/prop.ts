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

    console.log(Reflect.getOwnMetadata(ReflectKeys.Type, target))

  }
}