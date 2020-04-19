export interface IModel {
  find(query: object): this;
  findOne(query: object): this;
  findById(id: string): this;
  save(): this;
  update(data?: any): this;
  updateMany(query: object, data?: any): boolean;
  delete(id?: string): boolean;
  deleteMany(id: string[]): boolean;
}