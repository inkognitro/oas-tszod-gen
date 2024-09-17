import {Request, RequestHandler, RequestResult} from './core';

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
    // todo: implement validations
    return this.nextRequestHandler.execute(request, config);
  }

  public cancelAllRequests() {
    this.nextRequestHandler.cancelAllRequests();
  }

  public cancelRequestById(requestId: string) {
    this.nextRequestHandler.cancelRequestById(requestId);
  }
}
