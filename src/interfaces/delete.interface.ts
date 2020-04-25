export interface DeleteModel {
  /**
   * of: 1 if no errors occurred
   *
   * @type {number}
   * @memberof DeleteModel
   */
  ok?: number;

  /**
   * deletedCount: the number of documents deleted
   *
   * @type {number}
   * @memberof DeleteModel
   */
  deletedCount?: number;

  /**
   * n: the number of documents deleted. Equal to deletedCount
   *
   * @type {number}
   * @memberof DeleteModel
   */
  n?: number;
}