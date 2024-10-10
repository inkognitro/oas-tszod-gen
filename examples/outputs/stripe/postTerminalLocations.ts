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
import {Error} from './schemas';

export const postTerminalLocationsEndpointSchema = {
  path: '/v1/terminal/locations',
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

export type PostTerminalLocationsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      address: {
        city?: string;
        country: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
      };
      configuration_overrides?: string;
      display_name: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >
>;

export type PostTerminalLocationsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Location>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalLocationsRequestResult = RequestResult<
  PostTerminalLocationsRequest,
  PostTerminalLocationsResponse
>;

export function postTerminalLocations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalLocationsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalLocationsRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalLocationsEndpointSchema, payload),
    config
  );
}
