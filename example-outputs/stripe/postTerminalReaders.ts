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
import {Terminal_Reader, Error} from '@example-outputs/stripe';

export const postTerminalReadersEndpointSchema = {
  path: '/v1/terminal/readers',
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

export type PostTerminalReadersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      label?: string;
      location?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      registration_code: string;
    }
  >
>;

export type PostTerminalReadersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Reader>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalReadersRequestResult = RequestResult<
  PostTerminalReadersRequest,
  PostTerminalReadersResponse
>;

export function postTerminalReaders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalReadersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalReadersRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalReadersEndpointSchema, payload),
    config
  );
}
