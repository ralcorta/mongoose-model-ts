import * as mongoose from 'mongoose';

export type Schema = Map<string, PropertyParameter>

/**
 * Replicated from mognoose properties
 *
 * @export
 * @interface PropertyParameter
 */
export interface PropertyParameter {
  [key: string]: any;

  /** include this value?
   * @default true (Implicitly)
   */
  select?: boolean;

  /** is this value required?
   * @default false (Implicitly)
   */
  required?: RequiredType;

  /** Only accept Values from the Enum(|Array) */
  enum?: string[] | object;

  /** Give the Property a default Value */
  default?: any;

  /** Give an Validator RegExp or Function */
  validate?: Validator | Validator[];

  /** should this value be unique?
   * @link https://docs.mongodb.com/manual/indexes/#unique-indexes
   */
  unique?: boolean;

  /** should this value get an index?
   * @link https://docs.mongodb.com/manual/indexes
   */
  index?: boolean;

  /** @link https://docs.mongodb.com/manual/indexes/#sparse-indexes */
  sparse?: boolean;

  /**
   * Should this property have an "expires" index?
   * @link https://docs.mongodb.com/manual/tutorial/expire-data
   */
  expires?: string | number;

  /**
   * Should this property have an "text" index?
   * @link https://mongoosejs.com/docs/api.html#schematype_SchemaType-text
   */
  text?: boolean;

  /** should subdocuments get their own id?
   * @default true (Implicitly)
   */
  _id?: boolean;

  /**
   * Set an Setter (Non-Virtual) to pre-process your value
   * (when using get/set both are required)
   * Please note that the option `type` is required, if get/set saves a different value than what is defined
   * @param value The Value that needs to get modified
   * @returns The Value, but modified OR anything
   * @example
   * ```ts
   * function setHello(val: string): string {
   *   return val.toLowerCase()
   * }
   * function getHello(val: string): string {
   *   return val.toUpperCase();
   * }
   * class Dummy {
   *   @prop({ set: setHello, get: getHello }) // many options can be used, like required
   *   public hello: string;
   * }
   * ```
   */
  set?(val: any): any;

  /**
   * Set an Getter (Non-Virtual) to Post-process your value
   * (when using get/set both are required)
   * Please note that the option `type` is required, if get/set saves a different value than what is defined
   * @param value The Value that needs to get modified
   * @returns The Value, but modified OR anything
   * @example
   * ```ts
   * function setHello(val: string): string {
   *   return val.toLowerCase()
   * }
   * function getHello(val: string): string {
   * interface PropertyParameter {
   *   get?: Function;
   *   set?: Function;
   * }
   * class Dummy {
   *   @prop({ set: setHello, get: getHello }) // many options can be used, like required
   *   public hello: string;
   * }
   * ```
   */
  get?(val: any): any;

  /**
   * This may be needed if get/set is used
   * (this sets the type how it is saved to the DB)
   */
  type?: any;

  /**
   * Make a property read-only
   * @example
   * ```ts
   * class SomeClass {
   *  @prop({ immutable: true })
   *  public someprop: Readonly<string>;
   * }
   * ```
   */
  immutable?: boolean;

  /**
   * Give the Property an alias in the output
   * Note: you should include the alias as a variable in the class, but not with a prop decorator
   * @example
   * ```ts
   * class Dummy {
   *   @prop({ alias: "helloWorld" })
   *   public hello: string; // normal, with @prop
   *   public helloWorld: string; // is just for type Completion, will not be included in the DB
   * }
   * ```
   */
  alias?: string;

  /**
   * This option as only an effect when the plugin `mongoose-autopopulate` is used
   */
  // tslint:disable-next-line:ban-types
  autopopulate?: boolean | Function | { [key: string]: any; };

  /** Reference an other Document (you should use Ref<T> as Prop type) */
  ref?: any;

  /** Take the Path and try to resolve it to a Model */
  refPath?: string;

  /**
   * Override the ref's type
   * {@link BasePropOptions.type} can be used too
   * @default ObjectId
   */
  refType?: RefSchemaType;
}

export type Func = (...args: any[]) => any;

export type VoidFunc = () => void;

export type RequiredType = boolean | [boolean, string] | string | Func | [Func, string];

export type ValidatorFunction = (value: any) => boolean | Promise<boolean>;

export interface ValidatorOptions {
  validator: ValidatorFunction;
  message?: string;
}

export type Validator =
  | ValidatorFunction
  | RegExp
  | ValidatorOptions
  | ValidatorOptions[];

export type RefSchemaType = typeof mongoose.Schema.Types.Number |
  typeof mongoose.Schema.Types.String |
  typeof mongoose.Schema.Types.Buffer |
  typeof mongoose.Schema.Types.ObjectId;