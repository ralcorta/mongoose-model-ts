import { Types } from "mongoose";
import { Ref } from "./ref";

export enum ReflectKeys {

  /** Get the Typescript assigned Type at runtime */
  Type = 'design:type',

}

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

  public get(target: any, prop: string) {
    if (this.hasOwnProperty(prop)) {
      // DO STUFFS
    }

  }

  set(target: any, prop: string, value: any, receiver: any): boolean {
    const type = Reflect.getOwnMetadata(ReflectKeys.Type, target, prop);

    console.log(type);

    return target[prop] = value;
  }
}