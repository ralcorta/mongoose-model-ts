// DOCUMENTATION: https://zellwk.com/blog/jest-and-mongoose/

import 'jest-extended';

import { Model } from './model'
import { DbHandler } from './db-handler';
import { ModelRef } from './modelRef';
import { RefSchemaType } from '../src/types';
import { Types } from 'mongoose';
import { Collection } from '../src/collection'

enum CommonConfig {
  records = 20,
}

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await DbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await DbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await DbHandler.closeDatabase());

describe('Collection', () => {

  it('Instance[Should_success_When_InstanceCollectionWithItems]', async () => {

    const models = [];

    for (let i = 0; i < CommonConfig.records; i++) {
      models.push(new Model({ commonString: `Name ${i}`, commonNumber: i }));
    }

    const collect = new Collection<Model>(models);

    expect(models).toMatchObject(collect);
  });

  it('First[Should_success_When_FirstFound]', async () => {

    const model = new Model({ commonString: `Name`, commonNumber: 1 });

    const collect = new Collection<Model>([model]);

    expect(model).toMatchObject(collect.first());
  });

});