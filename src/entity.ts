// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import "reflect-metadata"

import { RecordSchema, Plugin } from './types';
import { ReflectSchema, ReflectModel, ReflectKey, ReflectPlugins, ReflectHooks } from './constants/symbols';
import { SchemaDefinition, Schema, Model as MongooseModel, Document, models, model } from "mongoose";
import { PropMeta } from "./constants/initial";
import { hook } from "./hooks";
import { IHookConstructor, IHook } from "./interfaces/hook.interface";

export function entity(target: Function) {
  const schema: RecordSchema = Reflect.getMetadata(ReflectSchema, target.prototype);

  const schemaMongoose = new Schema(schema as SchemaDefinition);

  const plugins: Plugin[] = Reflect.getMetadata(ReflectPlugins, target);

  const hooks: IHookConstructor[] = Reflect.getMetadata(ReflectHooks, target.prototype);

  if (plugins?.length > 0)
    plugins.forEach(plugin => schemaMongoose.plugin(plugin.plugin, plugin.options));

  if (hooks?.length > 0)
    hooks.forEach(hookConstructor => {
      const hookParameter: IHook = {
        schema: schemaMongoose,
        type: hookConstructor.type,
        hookName: hookConstructor.hookName,
        fn: hookConstructor.fn,
        options: hookConstructor.options,
      };
      hook(hookParameter);
    });

  const doc: MongooseModel<Document> = models[target.name]
    ? model(target.name)
    : model(target.name, schemaMongoose);

  Reflect.defineMetadata(ReflectKey, PropMeta.Key, target.prototype);

  Reflect.defineMetadata(ReflectModel, doc, target.prototype);
}
