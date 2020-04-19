// tslint:disable: no-console
// tslint:disable-next-line: no-unused-expression
import 'reflect-metadata'

import Debug from 'debug';
import { PropertyParameter, RecordSchema, StaticThis } from './types';
import { model, Document, Model as MongooseModel, models, Schema, SchemaDefinition, Types, Query } from 'mongoose';
import { ReflectKeys } from './constants/reflect.keys';
import { ReflectSchema, ReflectModel, ReflectKey } from './constants/symbols';
import { MagicProxy } from './utils/proxy';
import { MagicGetterProxy } from './utils/getter.proxy';
import { Person } from '../models/person';
import { Initial } from './constants/initial';
import * as _ from 'underscore'

const debug = Debug('framework:prop');

export class Model {

  /**
   * Virutal ID of document
   *
   * @private
   * @type {Types.ObjectId}
   * @memberof Model
   */
  private _id: Types.ObjectId;

  /**
   * Key of collection
   *
   * @protected
   * @type {*}
   * @memberof Model
   */
  protected get _key(): string {
    const children: object = Reflect.getPrototypeOf(this);
    return Reflect.getMetadata(ReflectKey, children) as string;
  };

  /**
   * Creates an instance of Model with the corresponding metadata.
   * @param {...any[]} data
   * @memberof Model
   */
  constructor(...data: any[]) {
    const children: object = Reflect.getPrototypeOf(this);

    const schema: RecordSchema = Reflect.getMetadata(ReflectSchema, children);

    /// USE models?
    let doc: MongooseModel<Document>;
    try {
      doc = model(children.constructor.name, new Schema(schema as SchemaDefinition));
    } catch {
      doc = model(children.constructor.name);
    }

    Reflect.defineMetadata(ReflectKey, Initial.Key, children);

    Reflect.defineMetadata(ReflectModel, doc, children);
  }


  /**
   * Getter for the virtual _id property
   *
   * @readonly
   * @type {Types.ObjectId}
   * @memberof Model
   */
  public get id(): Types.ObjectId {
    return this._id
  }

  /**
   * Return the Model reference
   *
   * @readonly
   * @private
   * @static
   * @type {MongooseModel<Document>}
   * @memberof Model
   */
  private get _model(): MongooseModel<Document> {
    const children: object = Reflect.getPrototypeOf(this);
    return Reflect.getMetadata(ReflectModel, children) as MongooseModel<Document>;
  }

  /**
   * Parse mongo document to instance of the class
   *
   * @private
   * @static
   * @template T
   * @param {StaticThis<T>} this
   * @param {Document} document
   * @returns {T}
   * @memberof Model
   */
  private static objToClass(obj: object, document: Document): any {
    const keys = _.keys(obj);
    const target = _.extend(obj, _.pick(document.toObject(), keys));
    return target;
  }

  /**
   * Parse mongo document to instance of the class
   *
   * @private
   * @static
   * @template T
   * @param {StaticThis<T>} this
   * @param {Document} document
   * @returns {T}
   * @memberof Model
   */
  private static docToClass(document: Document): any {
    return new this(document.toObject());
  }

  /**
   * Parse mongo document array to instance array
   *
   * @private
   * @static
   * @template T
   * @param {StaticThis<T>} this
   * @param {Document[]} documents
   * @returns {T[]}
   * @memberof Model
   */
  private static docsToClass(documents: Document[]): any[] {
    return documents.map(doc => Model.docToClass.call(this, doc));
  }

  // static create<T>(this: new () => T, data: object): T {
  // this: new (...data: any[]) => T,

  /**
   * Create a register of the document in the database and return the instance
   *
   * @static
   * @template T
   * @param {StaticThis<T>} this
   * @param {object} data
   * @returns {Promise<T>}
   * @memberof Model
   */
  public static async create<T extends Model>(this: StaticThis<T>, data: object): Promise<T> {
    try {
      const that = new this(data);
      return await that.save.call(that);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Save/Create a register of the document in the database and return the instance
   *
   * @returns {Promise<this>}
   * @memberof Model
   */
  public async save(): Promise<this> {
    const modelObj = new Model();
    try {
      if (await modelObj.exists(this.id)) {
        const doc = await this._model.findByIdAndUpdate(this.id, this);
        return Model.objToClass(this, doc);
      } else {
        const doc = await this._model.create({ ...this });
        return Model.objToClass(this, doc);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   *
   *
   * @private
   * @param {*} key
   * @returns {Promise<boolean>}
   * @memberof Model
   */
  private async exists(key: any): Promise<boolean> {
    const query: Record<string, any> = {};
    query[this._key] = key;
    return this._model.exists(query);
  }

  /**
   * Return an array of document casted found in database
   *
   * @static
   * @param {object} [query={}]
   * @param {(string | object[] | object)} [populate='']
   * @param {string} [selectFields='']
   * @returns {Promise<this[]>}
   * @memberof Model
   */
  public static async find<T extends Model>(this: StaticThis<T>, query: object = {}, populate: string | object[] | object = '', selectFields: string = ''): Promise<T[]> {
    let documents: Document[];

    const child: T = new this();
    try {
      documents = await child._model
        .find(query)
        .populate(populate)
        .select(selectFields)
        .exec();
    } catch (err) {
      return Promise.reject(err);
    }

    return documents ? Model.docsToClass.call(this, documents) : [];
  }

  /**
   * Return one document from database by ID
   *
   * @static
   * @template T
   * @param {StaticThis<T>} this
   * @param {(string | Types.ObjectId)} id
   * @param {(string | object[] | object)} [populate='']
   * @param {string} [selectFields='']
   * @returns {Promise<T[]>}
   * @memberof Model
   */
  public static async findById<T extends Model>(this: StaticThis<T>, id: string | Types.ObjectId, populate: string | object[] | object = '', selectFields: string = ''): Promise<T> {
    let document: Document;

    const child: T = new this();
    try {
      document = await child._model
        .findById(id)
        .populate(populate)
        .select(selectFields)
        .exec();
    } catch (err) {
      return Promise.reject(err);
    }

    return document ? Model.docToClass.call(this, document) as T : null;
  }

  /**
   * Return one document from database by the query
   *
   * @static
   * @template T
   * @param {StaticThis<T>} this
   * @param {object} [query={}]
   * @param {(string | object[] | object)} [populate='']
   * @param {string} [selectFields='']
   * @returns {Promise<T>}
   * @memberof Model
   */
  public static async findOne<T extends Model>(this: StaticThis<T>, query: object = {}, populate: string | object[] | object = '', selectFields: string = ''): Promise<T> {
    let document: Document;

    const child: T = new this();
    try {
      document = await child._model
        .findOne(query)
        .populate(populate)
        .select(selectFields)
        .exec();
    } catch (err) {
      return Promise.reject(err);
    }

    return document ? Model.docToClass.call(this, document) as T : null;
  }

  /**
   * Update a record in the database and return the instance
   *
   * @param {object} [data]
   * @returns {Promise<this>}
   * @memberof Model
   */
  // public async update(query: object = {}, update: object, options: any = {}): Promise<T> {
  //   // public async update(data?: object): Promise<this> {
  //   try {
  //     return this;
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // }

  // static async _save(properties: {}): Promise<That> {
  //   return new Model(this.doc().create(properties));
  // }

  // private static doc(): MongooseModel<Document> {
  //   const children: object = Reflect.getPrototypeOf(this);
  //   return model(children.constructor.name);
  // }
}