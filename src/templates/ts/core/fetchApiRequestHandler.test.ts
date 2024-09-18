import {FetchApiRequestHandler} from './fetchApiRequestHandler';
import {stringify} from 'qs';
import {createRequest} from './core';
import {jsonEndpointSchema} from './httpMockServerSchemas';
import {
  createEndpointSchema,
  createMockServer,
  MockServer,
} from './httpMockServer';

const port = 3010;
const server: MockServer = createMockServer([jsonEndpointSchema]);
let runningServer: MockServer | undefined;

const requestHandler = new FetchApiRequestHandler({
  stringifyQueryParams: queryParams => stringify(queryParams),
  baseUrl: `http://localhost:${port}`,
});

beforeAll(async () => {
  runningServer = server.start(port);
});

afterAll(() => {
  if (runningServer) {
    runningServer.stop();
  }
});

describe('FetchApiRequestHandler tests', () => {
  it('can send and receive json data', async () => {
    const rr = await requestHandler.execute(
      createRequest({
        endpointSchema: createEndpointSchema(jsonEndpointSchema),
      })
    );
    expect(rr.response?.status).toEqual(200);
    expect(rr.response.contentType).toContain('application/json');
    const body = await rr.response.revealBody();
    expect(body).toEqual(body);
  });
});
