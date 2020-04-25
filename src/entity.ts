// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import "reflect-metadata"

import { RecordSchema } from './types';
import { ReflectSchema, ReflectModel, ReflectKey } from './constants/symbols';
import { SchemaDefinition, Schema, Model as MongooseModel, Document, models, model } from "mongoose";
import { PropMeta } from "./constants/initial";

export function entity(target: Function) {
  const schema: RecordSchema = Reflect.getMetadata(ReflectSchema, target.prototype);

  const schemaMongoose = new Schema(schema as SchemaDefinition);

  const doc: MongooseModel<Document> = models[target.name]
    ? model(target.name)
    : model(target.name, schemaMongoose);

  Reflect.defineMetadata(ReflectKey, PropMeta.Key, target.prototype);

  Reflect.defineMetadata(ReflectModel, doc, target.prototype);
}
