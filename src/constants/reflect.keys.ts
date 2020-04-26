/**
 * Collection of Reflect Types for easy maintenance
 */
export enum ReflectKeys {

  /** Get the Typescript assigned Type at runtime */
  Type = 'design:type',

  /**
   * Store method to autopopulate
   * -> Use only for methods
   */
  AutopopulateMethod = 'tsmodel:autopopulatemethod',

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
   * Storage location for Property list
   * -> Use only for a class
   */
  Doc = 'tsmodel:doc',

  /**
   * Storage Key Property of user (like _id)
   * -> Use only for a class
   */
  Key = 'tsmodel:key',

  /**
   * Storage Key Property of user (like _id)
   * -> Use only for a class
   */
  PivotKey = 'tsmodel:pivotkey',

  /**
   * Storage list of plugins
   * -> Use only on class
   */
  Plugins = 'tsmodel:plugins'
}