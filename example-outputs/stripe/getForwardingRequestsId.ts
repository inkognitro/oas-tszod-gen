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
import {Forwarding_Request, Error} from '@example-outputs/stripe';

export const getForwardingRequestsIdEndpointSchema = {
  path: '/v1/forwarding/requests/{id}',
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

export type GetForwardingRequestsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetForwardingRequestsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Forwarding_Request>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetForwardingRequestsIdRequestResult = RequestResult<
  GetForwardingRequestsIdRequest,
  GetForwardingRequestsIdResponse
>;

export function getForwardingRequestsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetForwardingRequestsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetForwardingRequestsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getForwardingRequestsIdEndpointSchema, payload),
    config
  );
}
