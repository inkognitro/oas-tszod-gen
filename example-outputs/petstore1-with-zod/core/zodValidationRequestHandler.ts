import {Request, RequestHandler, RequestResult, ResponseSchema} from './core';
import {z, ZodSchema} from 'zod';

export type ZodValidationRequestHandlerExecutionConfig = {};

export class ZodValidationRequestHandler implements RequestHandler {
  private readonly nextRequestHandler: RequestHandler;

  constructor(nextRequestHandler: RequestHandler) {
    this.nextRequestHandler = nextRequestHandler;
    this.execute = this.execute.bind(this);
    this.cancelRequestById = this.cancelRequestById.bind(this);
    this.cancelAllRequests = this.cancelAllRequests.bind(this);
  }

  public execute(
    request: Request,
    config?: ZodValidationRequestHandlerExecutionConfig
  ): Promise<RequestResult> {
    return new Promise((resolve, reject) => {
      const requestZodSchema = this.createRequestZodSchema(request);
      const requestValidationResult = requestZodSchema.safeParse(request);
      if (!requestValidationResult.success) {
        reject(requestValidationResult.error);
        return;
      }
      this.nextRequestHandler.execute(request, config).then(rr => {
        const requestZodSchema = this.createResponseZodSchema(rr);
        const responseValidationResult = requestZodSchema.safeParse(
          rr.response
        );
        if (!responseValidationResult.success) {
          reject(responseValidationResult.error);
          return;
        }
        resolve(rr);
      });
    });
  }

  private createRequestZodSchema(request: Request): ZodSchema {
    const schemaProps: Record<string, ZodSchema> = {};
    const schema = request.endpointSchema;
    if (schema.pathParamsZodSchema) {
      schemaProps['pathParams'] = schema.pathParamsZodSchema;
    }
    if (schema.headersZodSchema) {
      schemaProps['headers'] = schema.headersZodSchema;
    }
    if (schema.queryParamsZodSchema) {
      schemaProps['queryParams'] = schema.queryParamsZodSchema;
    }
    if (schema.cookiesZodSchema && request.cookies) {
      schemaProps['cookies'] = schema.cookiesZodSchema;
    }
    const contentType = request.contentType;
    if (!contentType) {
      return z.object(schemaProps);
    }
    const bodySchema = schema.bodyByContentType[contentType];
    if (bodySchema && !(request.body instanceof FormData)) {
      schemaProps['body'] = bodySchema.zodSchema;
    }
    return z.object(schemaProps);
  }

  private createResponseZodSchema(rr: RequestResult): ZodSchema {
    const response = rr.response;
    if (!response) {
      return z.object({});
    }
    const schemaByStatus = rr.request.endpointSchema.responseByStatus;
    if (!schemaByStatus) {
      return z.object({});
    }
    const schema: undefined | ResponseSchema =
      schemaByStatus[response.status] ?? schemaByStatus['default'];
    if (!schema) {
      return z.object({});
    }
    const schemaProps: Record<string, ZodSchema> = {};
    if (schema.headersZodSchema) {
      schemaProps['headers'] = schema.headersZodSchema;
    }
    const contentType = response.contentType;
    if (!contentType) {
      return z.object(schemaProps);
    }
    const bodySchema = schema.bodyByContentType[contentType];
    if (bodySchema && !(response.body instanceof FormData)) {
      schemaProps['body'] = bodySchema.zodSchema;
    }
    return z.object(schemaProps);
  }

  public cancelAllRequests() {
    this.nextRequestHandler.cancelAllRequests();
  }

  public cancelRequestById(requestId: string) {
    this.nextRequestHandler.cancelRequestById(requestId);
  }
}
