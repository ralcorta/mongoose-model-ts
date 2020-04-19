/**
 * declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
 * declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
 * declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
 * declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
 */

// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import Debug from 'debug';
import { ReflectKeys } from './constants/reflect.keys';
import "reflect-metadata"
import { PropertyParameter, RecordSchema } from './types';
import { isNullOrUndefined } from 'util';
import { ReflectSchema } from './constants/symbols';

const debug = Debug('framework:prop');


export function prop(options: PropertyParameter = {}): (target: object, propertyName: string) => void {
  return (target: any, propertyName: string) => {
    const metadata = Reflect.getOwnMetadata(ReflectKeys.Type, target, propertyName);

    let list: RecordSchema = Reflect.getMetadata(ReflectSchema, target)

    if (isNullOrUndefined(list))
      list = {} as RecordSchema;

    const properties: object = {
      ...options,
      type: metadata,
    }

    list[propertyName] = properties;

    Reflect.defineMetadata(ReflectSchema, list, target)

    // let _val = target[propertyName];

    // const getter = () => {
    //   return _val;
    // };
    // const setter = (val: any) => {
    //   _val = `🍦 ${val} 🍦`;
    // };

    // Object.defineProperty(target, propertyName, {
    //   get: getter,
    //   set: setter,
    //   enumerable: true,
    //   configurable: true,
    // });
  }
}