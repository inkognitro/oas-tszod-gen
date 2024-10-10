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

export const getForwardingRequestsEndpointSchema = {
  path: '/v1/forwarding/requests',
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

export type GetForwardingRequestsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: {
      gt?: number; // int
      gte?: number; // int
      lt?: number; // int
      lte?: number; // int
    };
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetForwardingRequestsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Forwarding_Request[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetForwardingRequestsRequestResult = RequestResult<
  GetForwardingRequestsRequest,
  GetForwardingRequestsResponse
>;

export function getForwardingRequests(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetForwardingRequestsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetForwardingRequestsRequestResult> {
  return requestHandler.execute(
    createRequest(getForwardingRequestsEndpointSchema, payload),
    config
  );
}
