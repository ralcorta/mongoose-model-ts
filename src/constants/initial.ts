export enum PropMeta {

  /**
   * Key where model will search by id
   * -> Use only for a class
   */
  Key = '_id',

  /**
   * Pivot index to select id instead of get model of DB
   */
  pivotGetId = 'pivotGetId'
}