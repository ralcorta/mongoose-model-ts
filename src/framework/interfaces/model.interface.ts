import { RefSchemaType } from "../types";
import { DeleteModel } from "./delete.interface";

export interface IModel {
  find(query: object, populate: string | object[] | object, selectFields: string): Promise<IModel[]>;
  findOne(query: object, populate: string | object[] | object, selectFields: string): Promise<IModel>;
  findById(id: RefSchemaType, populate: string | object[] | object, selectFields: string): Promise<IModel>
  save(): Promise<this>;
  update(data?: object): Promise<this>;
  updateMany(query: object, data?: any): boolean;
  delete(id?: string): Promise<DeleteModel>;
  deleteMany(id: string[]): Promise<DeleteModel>;
}