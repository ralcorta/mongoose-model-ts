import { RefSchemaType } from "../types";

export interface RefCache<T> {
  type: T,
  key: RefSchemaType
}