import {
  z_Terminal_Location,
  z_Deleted_terminal_Location,
  z_Error,
  Terminal_Location,
  Deleted_terminal_Location,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const getTerminalLocationsLocationEndpointSchema = {
  path: '/v1/terminal/locations/{location}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
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
          zodSchema: z.union([
            z_Terminal_Location,
            z_Deleted_terminal_Location,
          ]),
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
