// tslint:disable: no-shadowed-variable
import type { Func, Plugin } from './types';
import { ReflectPlugins } from './constants/symbols'

export function plugin(plugin: Func, options?: any) {
  return (target: any) => {
    const plugins: Plugin[] = Array.from(Reflect.getMetadata(ReflectPlugins, target) ?? []);
    plugins.push({ plugin, options });
    console.log("Plugin: ", plugins)
    Reflect.defineMetadata(ReflectPlugins, plugins, target);
  };
}