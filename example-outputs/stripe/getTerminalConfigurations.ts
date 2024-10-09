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
import {Terminal_Configuration, Error} from '@example-outputs/stripe';

export const getTerminalConfigurationsEndpointSchema = {
  path: '/v1/terminal/configurations',
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

export type GetTerminalConfigurationsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    is_account_default?: boolean;
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetTerminalConfigurationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Terminal_Configuration[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTerminalConfigurationsRequestResult = RequestResult<
  GetTerminalConfigurationsRequest,
  GetTerminalConfigurationsResponse
>;

export function getTerminalConfigurations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTerminalConfigurationsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTerminalConfigurationsRequestResult> {
  return requestHandler.execute(
    createRequest(getTerminalConfigurationsEndpointSchema, payload),
    config
  );
}
