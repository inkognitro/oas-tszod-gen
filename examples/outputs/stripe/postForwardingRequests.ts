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
import {Forwarding_Request} from './forwarding';
import {Error} from './schemas';

export const postForwardingRequestsEndpointSchema = {
  path: '/v1/forwarding/requests',
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

export type PostForwardingRequestsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      payment_method: string;
      replacements: (
        | 'card_cvc'
        | 'card_expiry'
        | 'card_number'
        | 'cardholder_name'
      )[];
      request?: {
        body?: string;
        headers?: {
          name: string;
          value: string;
        }[];
      };
      url: string;
    }
  >
>;

export type PostForwardingRequestsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Forwarding_Request>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostForwardingRequestsRequestResult = RequestResult<
  PostForwardingRequestsRequest,
  PostForwardingRequestsResponse
>;

export function postForwardingRequests(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostForwardingRequestsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostForwardingRequestsRequestResult> {
  return requestHandler.execute(
    createRequest(postForwardingRequestsEndpointSchema, payload),
    config
  );
}
