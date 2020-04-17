/**
 * Required External Modules
 */
import App from './app'

import * as bodyParser from 'body-parser'
import * as dotenv from "dotenv";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";

import { loggerMiddleware } from './middlewares/logger'
import { MainController } from './controllers/main.controller';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = new App({
  port: PORT,
  controllers: [
    new MainController(),
  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware,
    helmet(),
    cors(),
  ]
})

const server = app.listen()

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
