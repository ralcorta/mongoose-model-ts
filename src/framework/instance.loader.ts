
export class InstanceLoader {

  static getInstance<T>(context: { [key: string]: any }, name: string, ...args: any[]): T {
    const classRef: new (...args: any[]) => any = context[name];

    if (!classRef) {
      throw new Error(`The class '${name}' was not found`);
    }

    let instance = Object.create(classRef.prototype);

    try {
      instance.constructor.apply(instance, args);
    } catch (err) {
      /**
       * For ES2015(ES6): constructor.apply is not allowed
       */
      if (/Class constructor/.test(err.toString())) {
        // tslint:disable-next-line: max-classes-per-file
        instance = class extends classRef {
          constructor(...params: any[]) {
            super(...params);
          }
        };

        return new instance(args) as T;
      }
    }

    return instance as T;
  }
}