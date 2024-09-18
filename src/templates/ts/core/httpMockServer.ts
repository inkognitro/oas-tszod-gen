const express = require('express');
import {Application, Request, Response} from 'express';
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

export type MockServer = Application & {
  start: (port: number) => MockServer;
  stop: () => void;
};

export function createMockServer(
  endpointSchemas: MockServerEndpointSchema[]
): MockServer {
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
    const startedApp = app.listen(port, () => {
      console.log(`[TestServer] listening on localhost:${port}`);
    });
    startedApp.stop = () => {
      console.log(`[TestServer] on localhost:${port} was stopped`);
      app.close();
    };
    return app;
  };
  return app;
}
