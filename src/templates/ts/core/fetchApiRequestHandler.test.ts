import {FetchApiRequestHandler} from './fetchApiRequestHandler';
import {stringify} from 'qs';
import {createRequest} from './core';
import {
  getFormDataEndpointSchema,
  getJsonEndpointSchema,
  getPlainTextEndpointSchema,
  mockFormData,
  postFormDataEndpointSchema,
  postJsonEndpointSchema,
  postPlainTextEndpointSchema,
} from './httpMockServerSchemas';
import {
  createEndpointSchema,
  createMockServerApp,
  MockServerApp,
  RunningServer,
} from './httpMockServer';

const port = 3010;

const mockServerApp: MockServerApp = createMockServerApp([
  getPlainTextEndpointSchema,
  postPlainTextEndpointSchema,
  getJsonEndpointSchema,
  postJsonEndpointSchema,
  getFormDataEndpointSchema,
  postFormDataEndpointSchema,
]);

let runningServer: RunningServer | undefined;

const requestHandler = new FetchApiRequestHandler({
  stringifyQueryParams: queryParams => stringify(queryParams),
  baseUrl: `http://localhost:${port}`,
});

beforeAll(async () => {
  runningServer = await mockServerApp.start(port);
});

afterAll(async () => {
  if (runningServer) {
    await runningServer.stop();
  }
});

describe('FetchApiRequestHandler', () => {
  it('can receive plain text data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        endpointSchema: createEndpointSchema(getPlainTextEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      getPlainTextEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toEqual('pong');
  });

  it('can send and receive plain text data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        contentType: 'text/plain',
        body: 'ping',
        endpointSchema: createEndpointSchema(postPlainTextEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      postPlainTextEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toEqual('pong');
  });

  it('can receive json data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        endpointSchema: createEndpointSchema(getJsonEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      getJsonEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toEqual(body);
  });

  it('can send and receive json data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        contentType: 'application/json',
        body: {foo: 'bar'},
        endpointSchema: createEndpointSchema(postJsonEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      postJsonEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toEqual(body);
  });

  it('can receive form data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        endpointSchema: createEndpointSchema(getFormDataEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      getFormDataEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toBeInstanceOf(FormData);
  });

  it('can send and receive form data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        contentType: 'multipart/form-data',
        body: mockFormData,
        endpointSchema: createEndpointSchema(postFormDataEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      postFormDataEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toEqual(body);
  });
});
