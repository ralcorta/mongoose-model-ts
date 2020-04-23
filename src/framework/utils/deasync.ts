import { runLoopOnce, loopWhile } from 'deasync';
import * as deasync from 'deasync';
import { model } from 'mongoose';

export class Deasync {
  public static execPromise(promise: any): any {
    let result: any;
    let error: Error;
    let done = false;

    promise.then((res: any) => { result = res })
      .catch((err: any) => { error = err })
      .finally(() => {
        done = true;
      })

    while (!done) {
      runLoopOnce();
    }

    if (error)
      throw error;

    return result;
  }

  public static execCb(fnPointer: Function, ...parameters: any): any {
    var ret: any = undefined;

    const cb = (err: any, data: any) => { if (err) return err; return ret = data };

    fnPointer.call(this, ...parameters, cb);

    loopWhile(() => ret === undefined);

    return ret;
  }
}