import {Request, RequestHandler, RequestResult} from './core';

export type ScopedRequestHandlerExecuteConfig = {};

export class ScopedRequestHandler implements RequestHandler {
  private pendingRequestIds: string[];
  private readonly nextRequestHandler: RequestHandler;

  constructor(nextRequestHandler: RequestHandler) {
    this.pendingRequestIds = [];
    this.nextRequestHandler = nextRequestHandler;
    this.execute = this.execute.bind(this);
    this.cancelRequestById = this.cancelRequestById.bind(this);
    this.cancelAllRequests = this.cancelAllRequests.bind(this);
  }

  public execute(
    request: Request,
    config?: ScopedRequestHandlerExecuteConfig
  ): Promise<RequestResult> {
    return new Promise(resolve => {
      this.pendingRequestIds.push(request.id);
      this.nextRequestHandler.execute(request, config).then(rr => {
        this.pendingRequestIds = this.pendingRequestIds.filter(
          requestId => request.id !== requestId
        );
        resolve(rr);
      });
    });
  }

  public cancelAllRequests() {
    this.pendingRequestIds.forEach(requestId =>
      this.nextRequestHandler.cancelRequestById(requestId)
    );
  }

  public cancelRequestById(requestId: string) {
    if (!this.pendingRequestIds.includes(requestId)) {
      return;
    }
    this.nextRequestHandler.cancelRequestById(requestId);
  }
}
