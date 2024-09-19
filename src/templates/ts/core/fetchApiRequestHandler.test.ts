import {FetchApiRequestHandler} from './fetchApiRequestHandler';
import {stringify} from 'qs';
import {createRequest} from './core';
import {
  getJsonEndpointSchema,
  postJsonEndpointSchema,
} from './httpMockServerSchemas';
import {
  createEndpointSchema,
  createMockServerApp,
  MockServerApp,
  RunningServer,
} from './httpMockServer';

const port = 3010;

const mockServerApp: MockServerApp = createMockServerApp([
  getJsonEndpointSchema,
  postJsonEndpointSchema,
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
  it('can receive json data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        endpointSchema: createEndpointSchema(getJsonEndpointSchema),
      })
    );
    expect(rr.response?.status).toBe(200);
    expect(rr.response.contentType).toContain('application/json');
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
    expect(rr.response.contentType).toContain('application/json');
    const body = await rr.response.revealBody();
    expect(body).toEqual(body);
  });
});
