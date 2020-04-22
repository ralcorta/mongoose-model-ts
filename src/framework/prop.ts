/**
 * declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
 * declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
 * declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
 * declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
 */

// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import "reflect-metadata"

import { ReflectKeys } from './constants/reflect.keys';
import { PropertyParameter, RecordSchema } from './types';
import { isNullOrUndefined } from 'util';
import { ReflectSchema } from './constants/symbols';
import { Types } from "mongoose";
import { isObject, property } from "underscore";

export function prop(options: PropertyParameter = {}): (target: object, propertyName: string) => void {

  const getProperties = (type: Record<string, any>, params: PropertyParameter): PropertyParameter => {
    const properties: PropertyParameter = {
      ...params,
      type,
    };

    if (params.ref) {
      properties.ref = isObject(params.ref) ? params?.ref?.prototype?.constructor?.name : params.ref;
      properties.type = properties.refType ?? Types.ObjectId;
    }

    if (params.refType) {
      properties.type = properties.refType ?? Types.ObjectId;
    }

    return properties;
  }

  return (target: any, propertyName: string) => {
    console.log(target)
    const type = Reflect.getOwnMetadata(ReflectKeys.Type, target, propertyName);

    const properties: PropertyParameter = getProperties(type, options);

    let list: RecordSchema = Reflect.getMetadata(ReflectSchema, target);

    if (isNullOrUndefined(list))
      list = {} as RecordSchema;

    list[propertyName] = properties;

    Reflect.defineMetadata(ReflectSchema, list, target);
  }
}