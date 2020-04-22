import Dog from '../../models/dog'
export class ObjectFactory {
  static create(className: string) {
    var obj;
    eval("obj=new " + className + "()");
    return obj;
  }
}
