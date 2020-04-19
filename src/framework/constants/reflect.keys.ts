/**
 * Collection of Reflect Types for easy maintenance
 */
export enum ReflectKeys {

  /** Get the Typescript assigned Type at runtime */

  Type = 'design:type',

  /**
   * "@prop" Cache
   * -> Use only for a class
   */
  PropCache = 'tsmodel:properties',

  /**
   * Storage location for Model Options
   * -> Use only for a class
   */
  ModelOptions = 'tsmodel:options',

  /**
   * Storage location for Indexes
   * -> Use only for a class
   */
  Index = 'tsmodel:indexes',

  /**
   * Storage location for Property list
   * -> Use only for a class
   */
  Schema = 'tsmodel:schema',

  /**
   * Storage location for Property list
   * -> Use only for a class
   */
  Model = 'tsmodel:model',

  /**
   * Storage Key Property of user (like _id)
   * -> Use only for a class
   */
  Key = 'tsmodel:key'
}