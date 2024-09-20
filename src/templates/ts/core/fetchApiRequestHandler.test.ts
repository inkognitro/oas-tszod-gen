import {FetchApiRequestHandler} from './fetchApiRequestHandler';
import {stringify, parse} from 'qs';
import {createRequest} from './core';
import {
  getBlobEndpointSchema,
  getFormDataEndpointSchema,
  getFormUrlEncodedDataEndpointSchema,
  getJsonEndpointSchema,
  getPlainTextEndpointSchema,
  mockPdfBlob,
  postBlobEndpointSchema,
  postFormDataEndpointSchema,
  postFormUrlEncodedDataEndpointSchema,
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
  getFormUrlEncodedDataEndpointSchema,
  postFormUrlEncodedDataEndpointSchema,
  getFormDataEndpointSchema,
  postFormDataEndpointSchema,
  getBlobEndpointSchema,
  postBlobEndpointSchema,
]);

let runningServer: RunningServer | undefined;

const requestHandler = new FetchApiRequestHandler({
  urlEncodeQueryString: plainObject => stringify(plainObject),
  urlDecodeQueryString: (queryString: string) => {
    return parse(queryString);
  },
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
    expect(body).toEqual({foo: 'bar'});
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
    expect(body).toEqual({foo: 'bar'});
  });

  it('can receive urlencoded form data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        endpointSchema: createEndpointSchema(
          getFormUrlEncodedDataEndpointSchema
        ),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      getFormUrlEncodedDataEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toEqual({foo: 'bar'});
  });

  it('can send and receive urlencoded form data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        contentType: 'application/x-www-form-urlencoded',
        body: {foo: 'bar'},
        endpointSchema: createEndpointSchema(
          postFormUrlEncodedDataEndpointSchema
        ),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      postFormUrlEncodedDataEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toEqual({foo: 'bar'});
  });

  it('can receive multipart form data', async () => {
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

  it('can send and receive multipart form data', async () => {
    const formData = new FormData();
    formData.append('foo', 'bar');
    const rr = await requestHandler.execute(
      createRequest({
        contentType: 'multipart/form-data',
        body: formData,
        endpointSchema: createEndpointSchema(postFormDataEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      postFormDataEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toBeInstanceOf(FormData);
  });

  it('can send from object converted form data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        contentType: 'multipart/form-data',
        body: {
          foo: 'bar',
        },
        endpointSchema: createEndpointSchema(postFormDataEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      postFormDataEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toBeInstanceOf(FormData);
  });

  it('can receive blob data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        endpointSchema: createEndpointSchema(getBlobEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      getBlobEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toBeInstanceOf(Blob);
  });

  it('can send and receive blob data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        contentType: 'application/pdf',
        body: mockPdfBlob,
        endpointSchema: createEndpointSchema(postBlobEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain(
      postBlobEndpointSchema.responseContentType
    );
    const body = await rr.response.revealBody();
    expect(body).toBeInstanceOf(Blob);
  });
});
