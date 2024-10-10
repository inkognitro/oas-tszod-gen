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
import {Deleted_terminal_Location} from './deleted_terminal';
import {Error} from './schemas';

export const deleteTerminalLocationsLocationEndpointSchema = {
  path: '/v1/terminal/locations/{location}',
  method: 'delete',
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

export type DeleteTerminalLocationsLocationRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    location: string;
  }
>;

export type DeleteTerminalLocationsLocationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_terminal_Location>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteTerminalLocationsLocationRequestResult = RequestResult<
  DeleteTerminalLocationsLocationRequest,
  DeleteTerminalLocationsLocationResponse
>;

export function deleteTerminalLocationsLocation(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteTerminalLocationsLocationRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteTerminalLocationsLocationRequestResult> {
  return requestHandler.execute(
    createRequest(deleteTerminalLocationsLocationEndpointSchema, payload),
    config
  );
}
