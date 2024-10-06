import {Request, RequestHandler, RequestResult, ResponseSchema} from './core';
import {SafeParseReturnType, z, ZodSchema} from 'zod';

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
        return reject(requestValidationResult.error);
      }
      this.nextRequestHandler.execute(request, config).then(rr => {
        if (!rr.response) {
          return resolve(rr);
        }
        this.safeParseAsyncRequestResult(rr).then(result => {
          if (!result.success) {
            return reject(result.error);
          }
          resolve(rr);
        });
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
    const bodyZodSchema = schema.bodyByContentType[contentType]?.zodSchema;
    if (bodyZodSchema) {
      schemaProps['body'] = z.union([z.instanceof(FormData), bodyZodSchema]);
    }
    return z.object(schemaProps);
  }

  private async safeParseAsyncRequestResult(
    rr: RequestResult
  ): Promise<SafeParseReturnType<any, any>> {
    const response = {...rr.response};
    if (!response) {
      return z.object({}).safeParse({});
    }
    const schemaByStatus = rr.request.endpointSchema.responseByStatus;
    if (!schemaByStatus) {
      return z.object({}).safeParse(response);
    }
    const schema: undefined | ResponseSchema =
      schemaByStatus[response.status] ?? schemaByStatus['default'];
    if (!schema) {
      return z.object({}).safeParse(response);
    }
    const schemaProps: Record<string, ZodSchema> = {};
    if (schema.headersZodSchema) {
      schemaProps['headers'] = schema.headersZodSchema;
    }
    const contentType = response.contentType;
    if (!contentType) {
      return z.object(schemaProps).safeParse(response);
    }
    const bodyZodSchema = schema.bodyByContentType[contentType]?.zodSchema;
    if (bodyZodSchema) {
      const body = await response.revealBody();
      if (!(body instanceof FormData)) {
        schemaProps['body'] = bodyZodSchema;
        response['body'] = body;
      }
    }
    return z.object(schemaProps).safeParse(response);
  }

  public cancelAllRequests() {
    this.nextRequestHandler.cancelAllRequests();
  }

  public cancelRequestById(requestId: string) {
    this.nextRequestHandler.cancelRequestById(requestId);
  }
}
