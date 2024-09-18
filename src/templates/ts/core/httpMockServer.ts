const {log, error} = require('console');
const express = require('express');
import {Request, Response} from 'express';
import {EndpointSchema, JsonValue, ResponseBody} from './core';

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

type ExpectedJsonRequest = {
  type: 'json';
  content: JsonValue;
};

type ExpectedFormDataRequestBody = {
  type: 'formData';
  content: FormData;
};

type ExpectedBlobRequestBody = {
  type: 'blob';
  content: FormData;
};

export type ExpectedRequestBody =
  | ExpectedJsonRequest
  | ExpectedFormDataRequestBody
  | ExpectedBlobRequestBody;

function validateExpectedRequestContentType(
  s: MockServerEndpointSchema,
  request: Request
) {
  if (!s.expectedRequestContentType) {
    return;
  }
  const actualValue = request.headers['content-type'];
  if (actualValue === s.expectedRequestContentType) {
    return;
  }
  error(
    'WRONG REQUEST HEADER "content-type":',
    '\nexpected:',
    s.expectedRequestContentType,
    '\nactual:',
    request.headers['content-type']
  );
  throw new Error('WRONG REQUEST HEADER');
}

function validateExpectedRequestBody(
  s: MockServerEndpointSchema,
  request: Request
) {
  // todo: implement
}

export type MockServerEndpointSchema = {
  method: (typeof validMethods)[number];
  path: string;
  expectedRequestContentType?: string;
  expectedRequestBody?: ExpectedRequestBody;
  responseContentType?: string;
  responseBody?: ResponseBody;
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
    app[s.method](
      createExpressPath(s.path),
      (request: Request, res: Response) => {
        validateExpectedRequestContentType(s, request);
        validateExpectedRequestBody(s, request);
        if (s.responseContentType !== undefined) {
          res.setHeader('content-type', s.responseContentType);
        }
        res.send(s.responseBody);
      }
    );
  });
  app.stop = () => {};
  app.start = (port: number) => {
    return new Promise(resolve => {
      const runningServer = app.listen(port, () => {
        log(`[TestServer] listening on localhost:${port}`);
      });
      resolve({
        stop: () => {
          return new Promise(resolve => {
            runningServer.close(() => {
              log(
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
