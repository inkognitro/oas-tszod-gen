import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';
import {Terminal_Location} from './terminal';
import {Deleted_terminal_Location} from './deleted_terminal';
import {Error} from './schemas';

export const getTerminalLocationsLocationEndpointSchema = {
  path: '/v1/terminal/locations/{location}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetTerminalLocationsLocationRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    location: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTerminalLocationsLocationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Terminal_Location | Deleted_terminal_Location) &
          (Partial<Terminal_Location> & Partial<Deleted_terminal_Location>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTerminalLocationsLocationRequestResult = RequestResult<
  GetTerminalLocationsLocationRequest,
  GetTerminalLocationsLocationResponse
>;

export function getTerminalLocationsLocation(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTerminalLocationsLocationRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTerminalLocationsLocationRequestResult> {
  return requestHandler.execute(
    createRequest(getTerminalLocationsLocationEndpointSchema, payload),
    config
  );
}
