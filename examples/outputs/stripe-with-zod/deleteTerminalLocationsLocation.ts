import {
  z_Deleted_terminal_Location,
  Deleted_terminal_Location,
} from './deleted_terminal';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
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

export const deleteTerminalLocationsLocationEndpointSchema = {
  path: '/v1/terminal/locations/{location}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    location: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Deleted_terminal_Location,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
