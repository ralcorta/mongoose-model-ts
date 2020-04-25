module.exports = {
  "roots": [
    "<rootDir>/test"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testEnvironment": "node",
  "setupFilesAfterEnv": ['./jest.setup.js']
}