const {log, error} = require('console');
const express = require('express');
const bodyParser = require('body-parser');
import {Request, Response, NextFunction} from 'express';
import {EndpointSchema, isJsonValue, JsonValue, ResponseBody} from './core';
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

type ExpectedJsonRequest = {
  type: 'json';
  content: JsonValue;
};

type ExpectedFormDataRequestBody = {
  type: 'formData';
};

type ExpectedBlobRequestBody = {
  type: 'blob';
};

export type ExpectedRequestBody =
  | ExpectedJsonRequest
  | ExpectedFormDataRequestBody
  | ExpectedBlobRequestBody;

function validateExpectedContentTypeRequestHeader(
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
  error('WRONG REQUEST HEADER "content-type":');
  error('expected:', s.expectedRequestContentType);
  error('actual:', request.headers['content-type']);
  throw new Error('WRONG REQUEST HEADER');
}

function createBodyParserByEndpointSchema(
  s: MockServerEndpointSchema
): NextFunction {
  if (!s.expectedRequestBody?.type) {
    return bodyParser.raw();
  }
  if (s.expectedRequestBody?.type === 'json') {
    return bodyParser.json();
  }
  if (s.expectedRequestBody?.type === 'blob') {
    return bodyParser.raw();
  }
  throw new Error(`case for "${s.expectedRequestBody.type}" is not supported`);
}

function findActualBodyType(
  content: unknown
): 'json' | 'formData' | 'blob' | 'unknown' | null {
  if (!content) {
    return null;
  }
  if (content instanceof FormData) {
    return 'formData';
  }
  if (isJsonValue(content)) {
    return 'json';
  }
  return 'unknown';
}

function validateExpectedRequestBody(
  s: MockServerEndpointSchema,
  request: Request
) {
  if (!s.expectedRequestBody) {
    return;
  }
  const actualBody = request.body;
  const actualBodyType = findActualBodyType(actualBody);
  const isValidJsonBody =
    actualBodyType === s.expectedRequestBody.type &&
    s.expectedRequestBody.type === 'json' &&
    JSON.stringify(actualBody) ===
      JSON.stringify(s.expectedRequestBody.content);
  if (isValidJsonBody) {
    return;
  }
  const isValidNonJsonBody =
    actualBodyType === s.expectedRequestBody.type && actualBodyType !== 'json';
  if (isValidNonJsonBody) {
    return;
  }
  error('WRONG REQUEST BODY:');
  error('expected body type:', s.expectedRequestBody.type);
  if (s.expectedRequestBody.type === 'json') {
    error('expected body:', s.expectedRequestBody.content);
  }
  error('actual body type:', actualBodyType);
  error('actual body:', request.body);
  throw new Error('WRONG REQUEST BODY');
}

export type MockServerEndpointSchema = {
  method: (typeof validMethods)[number];
  path: string;
  expectedRequestContentType?: string;
  expectedRequestBody?: ExpectedRequestBody;
  responseStatus: number;
  responseContentType?: string;
  responseBody?: ResponseBody;
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
        validateExpectedContentTypeRequestHeader(s, request);
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
