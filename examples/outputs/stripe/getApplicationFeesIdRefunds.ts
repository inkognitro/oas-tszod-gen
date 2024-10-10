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
import {Fee_refund, Error} from './schemas';

export const getApplicationFeesIdRefundsEndpointSchema = {
  path: '/v1/application_fees/{id}/refunds',
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

export type GetApplicationFeesIdRefundsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetApplicationFeesIdRefundsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Fee_refund[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetApplicationFeesIdRefundsRequestResult = RequestResult<
  GetApplicationFeesIdRefundsRequest,
  GetApplicationFeesIdRefundsResponse
>;

export function getApplicationFeesIdRefunds(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApplicationFeesIdRefundsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApplicationFeesIdRefundsRequestResult> {
  return requestHandler.execute(
    createRequest(getApplicationFeesIdRefundsEndpointSchema, payload),
    config
  );
}
