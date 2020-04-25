// DOCUMENTATION: https://zellwk.com/blog/jest-and-mongoose/

import 'jest-extended';

import { Model } from './model'
import { DbHandler } from './db-handler';


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

describe('Framework ', () => {

  it('Create[Should_success_When_SaveFunctionIsUsed]', async () => {

    const person = new Model({ commonString: "Rodrigo", commonNumber: 21 });

    person.save();

    const result = await Model.findById(person.id);

    expect(result).toMatchObject(person);
  });

  it('Create[Should_success_When_CreateFunctionIsUsed]', async () => {

    const person = await Model.create({ commonString: 'Rodrigo', commonNumber: 21 });

    const result = await Model.findById(person.id);

    expect(result).toMatchObject(person);

  });

  it('Update[Should_success_When_SaveFuncionIUsedInFoundRecord]', async () => {
    const oldModel = await Model.create({ commonString: 'Rodrigo', commonNumber: 21 });

    const toUpdateModel = await Model.findById(oldModel.id);

    toUpdateModel.commonString = "Carlos [Edited]";

    await toUpdateModel.save();

    const updatedModel: Model = await Model.findById(toUpdateModel.id);

    expect(updatedModel).not.toMatchObject(oldModel);
  });

  it('Update[Should_success_When_UpdateFuncionIUsedInFoundRecord]', async () => {
    const oldModel = await Model.create({ commonString: 'Rodrigo', commonNumber: 21 });

    const toUpdateModel = await Model.findById(oldModel.id);

    toUpdateModel.commonString = "Carlos [Edited]";

    await toUpdateModel.update();

    const updatedModel: Model = await Model.findById(toUpdateModel.id);

    expect(updatedModel).not.toMatchObject(oldModel);
  });

  it('Delete[Should_success_When_DeleteFuncionIUsed]', async () => {
    const person = await Model.create({ commonString: 'Rodrigo', commonNumber: 21 });

    const toBeDeletedModel = await Model.findById(person.id);

    await toBeDeletedModel.delete();

    const deletedModel = await Model.findById(toBeDeletedModel.id);

    expect(deletedModel).toBeNull();
  });

  it('Delete[Should_success_When_DeleteManyFuncionIUsed]', async () => {
    const promises = new Array();

    for (let i = 0; i < CommonConfig.records; i++) {
      promises.push(Model.create({ commonString: 'Rodrigo', commonNumber: 21 }));
    }

    await Promise.all(promises);

    await Model.deleteMany();

    const deletedsModel: Model[] = await Model.find();

    expect(deletedsModel).toBeEmpty();
  });
});