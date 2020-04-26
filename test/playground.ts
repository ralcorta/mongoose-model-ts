// tslint:disable: no-console
import * as mongoose from 'mongoose';

(async () => {
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "mongoose-model-ts" });

  // ... code and play here
})();
