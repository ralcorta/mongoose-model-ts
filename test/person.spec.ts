import 'jest-extended';

import { Person } from './person'
import { DbHandler } from './db-handler';

// DOCUMENTATION: https://zellwk.com/blog/jest-and-mongoose/

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

  it('should return true if the person was created by save function successfully', async () => {

    const person = new Person({ name: "Rodrigo", age: 21 });

    person.save();

    const result = await Person.findById(person.id);

    expect(result).toMatchObject(person);

  });
});