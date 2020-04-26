import { Schema } from "mongoose";
import { Func } from "../types";
import { HookMoment } from "../constants/hook";

export interface IHook extends IHookConstructor {
  schema: Schema;
}

export interface IHookConstructor {
  type: HookMoment;
  hookName: string;
  fn: Func;
  options?: object;
}