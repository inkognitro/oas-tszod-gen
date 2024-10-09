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
} from '@example-outputs/stripe/core';
import {
  Terminal_Location,
  Deleted_terminal_Location,
  Error,
} from '@example-outputs/stripe';

export const postTerminalLocationsLocationEndpointSchema = {
  path: '/v1/terminal/locations/{location}',
  method: 'post',
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

export type PostTerminalLocationsLocationRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      address?: {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
      };
      configuration_overrides?: string | '';
      display_name?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    location: string;
  }
>;

export type PostTerminalLocationsLocationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Terminal_Location | Deleted_terminal_Location) &
          (Partial<Terminal_Location> & Partial<Deleted_terminal_Location>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalLocationsLocationRequestResult = RequestResult<
  PostTerminalLocationsLocationRequest,
  PostTerminalLocationsLocationResponse
>;

export function postTerminalLocationsLocation(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalLocationsLocationRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalLocationsLocationRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalLocationsLocationEndpointSchema, payload),
    config
  );
}
