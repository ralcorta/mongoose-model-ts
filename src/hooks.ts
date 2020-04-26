import { Func, PropertyParameter } from "./types";
import { ReflectSchema, ReflectPreHooks, ReflectHooks } from "./constants/symbols";
import { Schema } from "mongoose";
import { IHookConstructor, IHook } from "./interfaces/hook.interface";
import { isNullOrUndefined } from "util";
import { HookMoment } from "./constants/hook";

export function hook(hook: IHook) {
  const params = [];

  if (hook.options)
    params.push(hook.options);

  params.push(hook.fn);

  (hook.schema as any)[hook.type](hook.hookName, ...params);
}

export function pre(hookName: string, options?: object) {

  return (target: any, propertyName: string) => {

    let hooks: IHookConstructor[] = Reflect.getMetadata(ReflectHooks, target);

    if (isNullOrUndefined(hooks))
      hooks = [];

    hooks.push({
      type: HookMoment.Pre,
      fn: target[propertyName],
      hookName,
      options,
    });

    console.log("Pre: ", hooks);

    Reflect.defineMetadata(ReflectHooks, hooks, target);
  }
}