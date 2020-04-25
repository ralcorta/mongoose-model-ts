// tslint:disable: no-shadowed-variable
// tslint:disable-next-line: ban-types
export const MagicProxy = <TFunction extends Function>(target: TFunction): TFunction | void => {
  // A toggle switch for the __isset method
  // Needed to control "prop in instance" inside of getters

  let issetEnabled = true

  const classHandler = Object.create(null)

  // Trap for class instantiation
  classHandler.construct = (target: any, args: any) => {
    // Wrapped class instance
    const instance = new target(...args)

    // Instance traps
    const instanceHandler: any = {};

    // __get()
    // Catches "instance.property"
    const get = Object.getOwnPropertyDescriptor(target.prototype, '__get')
    if (get) {
      instanceHandler.get = (target: any, name: any) => {
        // We need to turn off the __isset() trap for the moment to establish compatibility with PHP behaviour
        // PHP's __get() method doesn't care about its own __isset() method, so neither should we
        issetEnabled = false
        const exists = name in target
        issetEnabled = true

        if (exists) {
          return target[name]
        } else {
          return get.value.call(target, name)
        }
      }
    }

    // __set()
    // Catches "instance.property = ..."
    const set = Object.getOwnPropertyDescriptor(target.prototype, '__set')
    if (set) {
      instanceHandler.set = (target: any, name: any, value: any) => {
        if (name in target) {
          target[name] = value
        } else {
          return target.__set.call(target, name, value)
        }
      }
    }

    // __isset()
    // Catches "'property' in instance"
    const isset = Object.getOwnPropertyDescriptor(target.prototype, '__isset')
    if (isset) {
      instanceHandler.has = (target: any, name: any) => {
        if (!issetEnabled) return name in target

        return isset.value.call(target, name)
      }
    }

    // __unset()
    // Catches "delete instance.property"
    const unset = Object.getOwnPropertyDescriptor(target.prototype, '__unset')
    if (unset) {
      instanceHandler.deleteProperty = (target: any, name: any) => {
        return unset.value.call(target, name)
      }
    }

    return new Proxy(instance, instanceHandler)
  }

  // __getStatic()
  // Catches "class.property"
  if (Object.getOwnPropertyDescriptor(target, '__getStatic')) {
    classHandler.get = (target: any, name: any, receiver: any) => {
      if (name in target) {
        return target[name]
      } else {
        return target.__getStatic.call(receiver, name)
      }
    }
  }

  // __setStatic()
  // Catches "class.property = ..."
  if (Object.getOwnPropertyDescriptor(target, '__setStatic')) {
    classHandler.set = (target: any, name: any, value: any, receiver: any) => {
      if (name in target) {
        return target[name]
      } else {
        return target.__setStatic.call(receiver, name, value)
      }
    }
  }

  return new Proxy(target, classHandler)
}
