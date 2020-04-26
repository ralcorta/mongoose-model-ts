// import type { Func } from './types';


// export function plugin(plugin: Func, options: any) {
//   return (target: any) => {
//     const plugins: IPluginsArray<any>[] = Array.from(Reflect.getMetadata(DecoratorKeys.Plugins, target) ?? []);
//     plugins.push({ mongoosePlugin, options });
//     Reflect.defineMetadata(DecoratorKeys.Plugins, plugins, target);
//   };
// }