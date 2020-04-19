
export const MagicGetterProxy = (target: any) => {
  // A toggle switch for the __isset method
  // Needed to control "prop in instance" inside of getters


  const classHandler: Record<string, any> = {};

  // Trap for class instantiation
  classHandler.get = (target: any, name: any) => {
    // Wrapped class instance
    // const instance = new target(...args)

    // Instance traps 
    // const instanceHandler: any = {};

    // __get()
    // Catches "instance.property"
    let getter = Object.getOwnPropertyDescriptor(target.prototype, '__get');
    console.log(getter);
    return getter.value.call(target, name);
    // if (getter) {
    //   getter = function (target: any, name: any) {
    //     const exists = name in target

    //     if (exists) {
    //       return target[name]
    //     } else {
    //       return get.value.call(target, name)
    //     }
    //   }
    // }

    // return new Proxy(instance, instanceHandler)
  }

  return new Proxy(target, classHandler)
}
