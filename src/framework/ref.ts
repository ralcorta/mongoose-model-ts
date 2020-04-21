// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import 'reflect-metadata'

import * as _ from 'underscore'
import Debug from 'debug';

const debug = Debug('framework:prop');

export class Ref<T> {
  type?: new () => T;
}