// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import 'reflect-metadata'

import * as _ from 'underscore'
import Debug from 'debug';
import { Model } from './model';
import { StaticThis } from './types';
import { ReflectKeys } from './constants/reflect.keys';

const debug = Debug('framework:prop');

export class Ref<T extends Model> {
  type?: T;

  public static generate<T extends Model>(type: new () => T): Ref<T> {
    const ref = new Ref<T>();
    // ref.type = new type();
    return ref;
  }

  public static getCacheName(propName: string): string {
    return `${ReflectKeys.PropCache}:${propName}`;
  }
}