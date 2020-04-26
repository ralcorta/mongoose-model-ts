// tests/db-handler.js

import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

/**
 * Class done to handle a database in memory
 * Only made for testing purposes
 *
 * @export
 * @class DbHandler
 */
export class DbHandler {

  /**
   * Connect to the in-memory database.
   */
  public static async connect() {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    };

    await mongoose.connect(uri, mongooseOpts);
  }

  /**
   * Drop database, close the connection and stop mongod.
   */
  public static async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }

  /**
   * Remove all the data for all db collections.
   */
  public static async clearDatabase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      if (collections.hasOwnProperty(key)) {
        const element = collections[key];
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  }
}