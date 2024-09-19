const {log, error} = require('console');
const express = require('express');
const bodyParser = require('body-parser');
import {Request, Response, NextFunction} from 'express';
import {EndpointSchema, ResponseBody} from './core';
import {z, ZodSchema} from 'zod';

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

type ExpectedRequestBody = {
  contentType: string;
  content?: any;
};

function validateExpectedRequestContentType(
  s: MockServerEndpointSchema,
  request: Request
) {
  const expectedContentType = s.expectedRequestBody?.contentType;
  if (!expectedContentType) {
    return;
  }
  const actualValue = request.headers['content-type'];
  if (actualValue === expectedContentType) {
    return;
  }
  error('WRONG REQUEST HEADER "content-type":');
  error('expected:', expectedContentType);
  error('actual:', request.headers['content-type']);
  throw new Error('WRONG REQUEST HEADER');
}

function createBodyParserByEndpointSchema(
  s: MockServerEndpointSchema
): NextFunction {
  const contentType = s.expectedRequestBody?.contentType;
  if (!contentType) {
    return bodyParser.raw();
  }
  if (contentType === 'application/json') {
    return bodyParser.json();
  }
  const message = `MockServer case for contentType "${contentType}" is not supported`;
  error(message);
  throw new Error(message);
}

function validateExpectedRequestBody(
  s: MockServerEndpointSchema,
  request: Request
) {
  const expectedContentType = s.expectedRequestBody?.contentType;
  const expectedContent = s.expectedRequestBody?.content;
  if (!expectedContentType || !expectedContent) {
    return;
  }
  const isValidJsonBody =
    expectedContentType === 'application/json' &&
    JSON.stringify(request.body) === JSON.stringify(expectedContent);
  if (isValidJsonBody) {
    return;
  }
  error('WRONG REQUEST BODY:');
  error('expected body type:', expectedContentType);
  if (expectedContentType === 'application/json') {
    error('expected body:', expectedContent);
    error('actual body:', request.body);
  }
  throw new Error('WRONG REQUEST BODY');
}

export type MockServerEndpointSchema = {
  method: (typeof validMethods)[number];
  path: string;
  expectedRequestBody?: ExpectedRequestBody;
  responseStatus: number;
  responseContentType: null | string;
  responseBody: null | ResponseBody;
};

export function createEndpointSchema(
  s: MockServerEndpointSchema
): EndpointSchema {
  const responseBodyContentTypeMap: Record<string, {zodSchema: ZodSchema}> = {};
  if (s.responseContentType) {
    responseBodyContentTypeMap[s.responseContentType] = {
      zodSchema: z.any(),
    };
  }
  return {
    path: s.path,
    method: s.method,
    supportedSecuritySchemas: [],
    bodyByContentType: {},
    responseByStatus: {
      [s.responseStatus]: {
        bodyByContentType: responseBodyContentTypeMap,
      },
    },
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
      createBodyParserByEndpointSchema(s),
      (request: Request, res: Response) => {
        res.status(s.responseStatus);
        validateExpectedRequestContentType(s, request);
        validateExpectedRequestBody(s, request);
        if (s.responseContentType !== null) {
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
        log(`[TestServer localhost:${port}] started`);
      });
      resolve({
        stop: () => {
          return new Promise(resolve => {
            runningServer.close(() => {
              log(`[TestServer localhost:${port}] stopped`);
              resolve(undefined);
            });
          });
        },
      });
    });
  };
  return app;
}
