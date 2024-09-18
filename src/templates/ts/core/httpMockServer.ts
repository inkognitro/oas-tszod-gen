const express = require('express');
import {Request, Response} from 'express';
import {EndpointSchema, ResponseBody} from './core';

function createExpressPath(endpointSchemaPath: string): string {
  const pathParamNames = endpointSchemaPath.match(/[^{}]+(?=})/g) ?? [];
  let expressPath = endpointSchemaPath;
  pathParamNames.forEach(pathParamName => {
    expressPath = expressPath
      .split(`{${pathParamName}}`)
      .join(`:${pathParamName}`);
  });
  return expressPath;
}

const validMethods = ['get', 'post', 'put', 'delete'];
const validResponseContentTypes = ['application/json', 'multipart/form-data'];

export type MockServerEndpointSchema = {
  method: (typeof validMethods)[number];
  path: string;
  responseContentType: (typeof validResponseContentTypes)[number];
  responseBody: ResponseBody;
};

export function createEndpointSchema(
  schema: MockServerEndpointSchema
): EndpointSchema {
  return {
    path: schema.path,
    method: schema.method,
    supportedSecuritySchemas: [],
    bodyByContentType: {},
    responseByStatus: {},
  };
}

export type RunningServer = {
  stop: () => Promise<undefined>;
};

export type MockServerApp = {
  start: (port: number) => Promise<RunningServer>;
};

export function createMockServerApp(
  endpointSchemas: MockServerEndpointSchema[]
): MockServerApp {
  const app = express();
  endpointSchemas.forEach(s => {
    app[s.method](createExpressPath(s.path), (_: Request, res: Response) => {
      // todo: validate response contents somehow

      res.setHeader('Content-Type', s.responseContentType);
      res.send(s.responseBody);
    });
  });
  app.stop = () => {};
  app.start = (port: number) => {
    return new Promise(resolve => {
      const runningServer = app.listen(port, () => {
        console.log(`[TestServer] listening on localhost:${port}`);
      });
      resolve({
        stop: () => {
          return new Promise(resolve => {
            runningServer.close(() => {
              console.log(
                `[TestServer] running server on localhost:${port} was stopped`
              );
              resolve(undefined);
            });
          });
        },
      });
    });
  };
  return app;
}
