import {createRequest, Request, RequestHandler, RequestResult} from './core';
import {getJsonEndpointSchema} from './httpMockServerSchemas';
import {createEndpointSchema} from './httpMockServer';
import {ScopedRequestHandler} from './scopedRequestHandler';

class MockRequestHandler implements RequestHandler {
  public readonly cancelledRequestIds: string[] = [];

  constructor() {
    this.cancelledRequestIds = [];
  }

  execute(request: Request): Promise<RequestResult> {
    return new Promise(resolve => {
      resolve({
        request,
        response: undefined,
        hasRequestBeenCancelled: true,
      });
    });
  }

  cancelRequestById(requestId: string) {
    this.cancelledRequestIds.push(requestId);
  }

  cancelAllRequests() {
    throw new Error('not required for this test cases');
  }
}

const endpointSchema = createEndpointSchema(getJsonEndpointSchema);

describe('ScopedRequestHandler', () => {
  it('can only cancel own scope requests when cancelling all requests', async () => {
    const mockRequestHandler = new MockRequestHandler();
    const scopedRequestHandler1 = new ScopedRequestHandler(mockRequestHandler);
    const scopedRequestHandler2 = new ScopedRequestHandler(mockRequestHandler);
    const request1_1 = createRequest({endpointSchema});
    const request1_2 = createRequest({endpointSchema});
    const request2_1 = createRequest({endpointSchema});
    scopedRequestHandler1.execute(request1_1);
    scopedRequestHandler1.execute(request1_2);
    scopedRequestHandler2.execute(request2_1);
    scopedRequestHandler1.cancelAllRequests();
    expect(mockRequestHandler.cancelledRequestIds.length).toBe(2);
    expect(mockRequestHandler.cancelledRequestIds).toContain(request1_1.id);
    expect(mockRequestHandler.cancelledRequestIds).toContain(request1_2.id);
    expect(mockRequestHandler.cancelledRequestIds).not.toContain(request2_1.id);
  });

  it('can only cancel own scope requests when cancelling a specific request', async () => {
    const mockRequestHandler = new MockRequestHandler();
    const scopedRequestHandler1 = new ScopedRequestHandler(mockRequestHandler);
    const scopedRequestHandler2 = new ScopedRequestHandler(mockRequestHandler);
    const request1_1 = createRequest({endpointSchema});
    const request1_2 = createRequest({endpointSchema});
    const request2_1 = createRequest({endpointSchema});
    scopedRequestHandler1.execute(request1_1);
    scopedRequestHandler1.execute(request1_2);
    scopedRequestHandler2.execute(request2_1);
    scopedRequestHandler1.cancelRequestById(request1_1.id);
    scopedRequestHandler1.cancelRequestById(request2_1.id);
    expect(mockRequestHandler.cancelledRequestIds.length).toBe(1);
    expect(mockRequestHandler.cancelledRequestIds).toContain(request1_1.id);
  });
});
