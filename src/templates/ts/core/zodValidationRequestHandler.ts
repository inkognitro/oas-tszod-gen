import {Request, RequestHandler, RequestResult, ResponseSchema} from './core';

export type ZodValidationRequestHandlerExecutionConfig = {};

export class ZodValidationRequestHandler implements RequestHandler {
  private readonly nextRequestHandler: RequestHandler;

  constructor(nextRequestHandler: RequestHandler) {
    this.nextRequestHandler = nextRequestHandler;
    this.execute = this.execute.bind(this);
    this.cancelRequestById = this.cancelRequestById.bind(this);
    this.cancelAllRequests = this.cancelAllRequests.bind(this);
  }

  private validateRequest(request: Request) {
    const schema = request.endpointSchema;
    if (schema.pathParamsZodSchema) {
      schema.pathParamsZodSchema.parse(request.pathParams);
    }
    if (schema.headersZodSchema) {
      schema.headersZodSchema.parse(request.headers);
    }
    if (schema.queryParamsZodSchema) {
      schema.queryParamsZodSchema.parse(request.queryParams);
    }
    if (schema.cookiesZodSchema && request.cookies) {
      schema.cookiesZodSchema.parse(request.cookies);
    }
    const contentType = request.contentType;
    if (!contentType) {
      return;
    }
    const bodySchema = schema.bodyByContentType[contentType];
    if (!bodySchema || request.body instanceof FormData) {
      return;
    }
    bodySchema.zodSchema.parse(request.body);
  }

  private validateResponse(rr: RequestResult) {
    const response = rr.response;
    if (!response) {
      return;
    }
    const schema: undefined | ResponseSchema =
      rr.request.endpointSchema.responseByStatus?.[response.status];
    if (!schema) {
      return;
    }
    if (schema.headersZodSchema) {
      schema.headersZodSchema.parse(response.headers);
    }
    const contentType = response.contentType;
    if (!contentType) {
      return;
    }
    const bodySchema = schema.bodyByContentType[contentType];
    if (!bodySchema || response.body instanceof FormData) {
      return;
    }
    bodySchema.zodSchema.parse(response.body);
  }

  public execute(
    request: Request,
    config?: ZodValidationRequestHandlerExecutionConfig
  ): Promise<RequestResult> {
    return new Promise((resolve, reject) => {
      try {
        this.validateRequest(request);
        this.nextRequestHandler.execute(request, config).then(rr => {
          try {
            this.validateResponse(rr);
            resolve(rr);
          } catch (e) {
            reject(e);
            return;
          }
        });
      } catch (e) {
        reject(e);
        return;
      }
    });
  }

  public cancelAllRequests() {
    this.nextRequestHandler.cancelAllRequests();
  }

  public cancelRequestById(requestId: string) {
    this.nextRequestHandler.cancelRequestById(requestId);
  }
}
