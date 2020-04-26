
export class Collection<T = any> extends Array<T> {
  constructor(items?: T[]) {
    items ? super(...items) : super();
    Object.setPrototypeOf(this, Object.create(Collection.prototype));
  }

  public first() {
    return this.length > 0 ? this[0] : null;
  }
}
